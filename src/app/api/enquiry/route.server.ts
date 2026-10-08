import { handleEnquiry } from "@/lib/enquiry";

export const runtime = "nodejs";

export function POST(request: Request) {
  return handleEnquiry(request, {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ENQUIRY_FROM_EMAIL: process.env.ENQUIRY_FROM_EMAIL,
    ENQUIRY_NOTIFY_EMAIL: process.env.ENQUIRY_NOTIFY_EMAIL,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_WRITE_TOKEN: process.env.SANITY_WRITE_TOKEN,
  });
}
