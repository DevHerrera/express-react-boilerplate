export interface Contact {
  id: number;
  fullName: string;
  email?: string;
  phone: string;
}

export interface ContactState {
  contacts: Contact[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}
