export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string | null;
  role: string;
  token?: string;
}
