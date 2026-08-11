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
  const { data, error } = await supabase.rpc("create_inquiry", {
    p_full_name: input.fullName,
    p_email: input.email,
    p_phone: input.phone || null,
    p_preferred_contact_method: input.preferredContactMethod || null,
    p_message: input.message,
    p_jewelry_id: input.jewelryId || null,
  });

  if (error) {
    throw error;
  }

  return { id: data };
}
