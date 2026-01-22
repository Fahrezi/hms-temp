export type Guest = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  id_card_number?: string;
  guest_type: 'regular' | 'corporate';
  created_at?: string;
  updated_at?: string;
};

export type CorporateGuest = Guest & {
  company_name: string;
  corporate_email?: string;
  billing_address?: string;
  tax_id?: string;
};

export type CreateGuestRequest = {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  id_card_number?: string;
};

export type CreateCorporateGuestRequest = CreateGuestRequest & {
  company_name: string;
  corporate_email?: string;
  billing_address?: string;
  tax_id?: string;
};

export type UpdateGuestRequest = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  id_card_number?: string;
  company_name?: string;
  corporate_email?: string;
  billing_address?: string;
  tax_id?: string;
};

export type SearchGuestParams = {
  name?: string;
  email?: string;
  phone?: string;
  page?: number;
};

export type GuestResponse = {
  data: Guest | CorporateGuest;
  message?: string;
};

export type GuestsResponse = {
  data: (Guest | CorporateGuest)[];
  total_pages?: number;
  current_page?: number;
  total_count?: number;
};
