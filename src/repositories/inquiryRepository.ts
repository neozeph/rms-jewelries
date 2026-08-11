import { supabase } from "../lib/supabase/client";

export interface CreateInquiryInput {
  fullName: string;
  email: string;
  phone?: string | null;
  preferredContactMethod?: string | null;
  message: string;
  jewelryId?: string | null;
}

export interface CreatedInquiry {
  id: string;
}

export async function createInquiry(
  input: CreateInquiryInput,
): Promise<CreatedInquiry> {
  const customerId = crypto.randomUUID();

  const { error: customerError } = await supabase.from("customers").insert({
    id: customerId,
    full_name: input.fullName,
    email: input.email,
    phone: input.phone || null,
  });

  if (customerError) {
    throw customerError;
  }

  const message = input.preferredContactMethod
    ? `Preferred contact method: ${input.preferredContactMethod}\n\n${input.message}`
    : input.message;

  const inquiryId = crypto.randomUUID();

  const { error: inquiryError } = await supabase.from("inquiries").insert({
    id: inquiryId,
    customer_id: customerId,
    jewelry_id: input.jewelryId || null,
    inquiry_type: input.jewelryId ? "jewelry_piece" : "general",
    message,
    source: "website",
  });

  if (inquiryError) {
    throw inquiryError;
  }

  return { id: inquiryId };
}
