import assert from 'node:assert/strict';
import { handleEnquiry } from '../src/lib/enquiry.ts';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const adapter = ts.transpileModule(await readFile(new URL('../functions/api/enquiry.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText.replace('../../src/lib/enquiry', new URL('../src/lib/enquiry.ts', import.meta.url).href);
const { onRequestPost } = await import(`data:text/javascript;base64,${Buffer.from(adapter).toString('base64')}`);

const env = { RESEND_API_KEY: 'test-only', ENQUIRY_FROM_EMAIL: 'Test <enquiries@mytripworld.net>' };
const body = { name: 'Test Visitor', phone: '+919876543210', trip: 'Japan', travellers: '2 adults', month: 'December', message: 'Vegetarian meals', page: '/contact/' };
const request = (value = body, headers = {}) => new Request('https://mytripworld.net/api/enquiry', { method: 'POST', headers, body: typeof value === 'string' ? value : JSON.stringify(value) });
const originalFetch = globalThis.fetch;
let calls = [];
globalThis.fetch = async (url, options) => {
  calls.push({ url, body: JSON.parse(options.body) });
  return Response.json({ id: 'test-receipt' });
};
try {
  assert.equal((await handleEnquiry(request(), {})).status, 503);
  assert.equal((await handleEnquiry(request({ ...body, phone: 'invalid' }), env)).status, 422);
  assert.equal((await handleEnquiry(request('[]'), env)).status, 400);
  assert.equal((await handleEnquiry(request('x'.repeat(10001)), env)).status, 413);
  assert.equal((await handleEnquiry(request(body, { origin: 'https://other.example' }), env)).status, 403);
  assert.equal((await handleEnquiry(request({ website: 'bot' }), env)).status, 200);
  assert.equal(calls.length, 0);
  assert.equal((await handleEnquiry(request({ ...body, to: 'attacker@example.com' }), env)).status, 200);
  assert.deepEqual(calls[0].body.to, ['info@mytripworld.net']);
  for (const value of Object.values(body)) assert.ok(calls[0].body.text.includes(value));
  assert.equal((await onRequestPost({ request: request(), env })).status, 200);
  globalThis.fetch = async () => Response.json({ statusCode: 403, name: 'validation_error', message: 'The send.mytripworld.net domain is not verified. Please, add and verify your domain.' }, { status: 403 });
  const rejected = await handleEnquiry(request(), env);
  assert.equal(rejected.status, 500);
  assert.deepEqual(await rejected.json(), { error: 'Could not send the enquiry.', reason: 'sender_domain_not_verified', providerStatus: 403, senderDomain: 'mytripworld.net' });
  globalThis.fetch = async () => Response.json({ statusCode: 403, name: 'invalid_api_key', message: 'API key is invalid' }, { status: 403 });
  assert.equal((await (await handleEnquiry(request(), env)).json()).reason, 'api_key_rejected');
  globalThis.fetch = async () => Response.json({ statusCode: 403, name: 'validation_error', message: 'You can only send testing emails to your own email address.' }, { status: 403 });
  assert.equal((await (await handleEnquiry(request(), env)).json()).reason, 'provider_test_mode');
  globalThis.fetch = async () => Response.json({});
  assert.equal((await handleEnquiry(request(), env)).status, 500);
  globalThis.fetch = async () => { throw new Error('network failed'); };
  const failed = await handleEnquiry(request(), env);
  assert.equal(failed.status, 500);
  assert.equal((await failed.json()).reason, 'provider_unreachable');
  globalThis.fetch = async (url) => url.includes('resend.com') ? Response.json({ id: 'ok' }) : Response.json({}, { status: 403 });
  assert.equal((await handleEnquiry(request(), { ...env, SANITY_PROJECT_ID: 'test', SANITY_WRITE_TOKEN: 'test-only' })).status, 200);
  for (let i = 0; i < 5; i++) assert.equal((await handleEnquiry(request({ website: 'bot' }, { 'cf-connecting-ip': 'test-ip' }), env)).status, 200);
  assert.equal((await handleEnquiry(request(body, { 'cf-connecting-ip': 'test-ip' }), env)).status, 429);
  console.log('Enquiry checks passed: email without CMS, recipient/content, Cloudflare adapter, validation, provider failures, optional CMS failure and rate limit. No real email sent.');
} finally { globalThis.fetch = originalFetch; }
