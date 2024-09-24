export interface User {
  uid: string;
  email: string;
  fullName: string;
  photoURL?: string;
  emailVerified: boolean;
  [key: string]: any;
}
