import { handleEnquiry, type EnquiryEnv } from "../../src/lib/enquiry";

// Deploy with Cloudflare Pages Git integration or Wrangler (not dashboard drag-and-drop).
export function onRequestPost(context: { request: Request; env: EnquiryEnv }) {
  return handleEnquiry(context.request, context.env);
}
