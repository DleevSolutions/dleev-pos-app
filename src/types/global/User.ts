export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  login: string; //Email
  roles: string[];
  permissions: string[];
}
