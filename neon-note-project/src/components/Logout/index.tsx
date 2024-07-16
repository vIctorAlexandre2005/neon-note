import { auth } from "@/services/firebase";

export function Logout() {
  auth.signOut();
};
