import assert from 'node:assert/strict';
import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {applyPackageUpdates} from '../../src/lib/content/package-updates.ts';
const dir='src/lib/content/package-updates';
const updates=readdirSync(dir).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync(`${dir}/${f}`,'utf8')));
assert.equal(updates.length,11);
assert.equal(new Set(updates.map(u=>u.slug)).size,11);
assert.equal(updates.filter(u=>u.create).length,1);
const originals=updates.filter(u=>!u.create).map(u=>({_id:u.id,_type:'package',slug:{current:u.slug},...u.expected,unrelated:'preserve me'}));
const result=applyPackageUpdates(originals);
for(const u of updates){
 const doc=result.find(d=>d._id===u.id);
 assert.ok(doc);
 for(const [k,v] of Object.entries(u.set)) assert.deepEqual(doc[k],v,`${u.slug}: ${k}`);
 if(!u.create)assert.equal(doc.unrelated,'preserve me');
 assert.equal(doc.departures.length,0);
 assert.ok(doc.priceTerms.note.includes('Applicable GST/TCS'));
 assert.ok(!JSON.stringify(doc.paymentPolicy ?? []).match(/(?:TCS.*\d+%|\d+%.*TCS)/));
 assert.ok(!JSON.stringify(doc.overview).includes('Departure Dated'));
}
// Editor changes, repeated builds and explicitly removed CMS packages remain respected.
const edited=structuredClone(originals);edited[0].title='A later CMS title';
assert.equal(applyPackageUpdates(edited)[0].title,'A later CMS title');
assert.deepEqual(applyPackageUpdates(result),result);
assert.equal(applyPackageUpdates([]).length,1);
assert.equal(applyPackageUpdates([],true).length,11);
const newPackage=result.find(d=>d.slug.current==='singapore-philippines-bali');
assert.equal(newPackage.nights,11);assert.equal(newPackage.price,149999);
assert.equal(newPackage.stops.reduce((n,s)=>n+s.nights,0),11);
assert.equal(result.find(d=>d.slug.current==='costa-cruise-uae-oman-qatar').price,119999);
function images(v){if(Array.isArray(v))v.forEach(images);else if(v&&typeof v==='object'){if(v._sanityAsset)assert.ok(existsSync(v._sanityAsset.replace('image@file://{{ROOT}}/','')),v._sanityAsset);Object.values(v).forEach(images)}}
updates.forEach(u=>images(u.fallback));
console.log('Package source checks passed: 11 unique packages, editor preservation, tax copy, source totals, price and portable images.');
