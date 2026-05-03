export interface ContactRequest {
  company?: string | null;
  email: string;
  name: string;
  phone?: string | null;
  projectDescription: string;
  service?: string | null;
}
