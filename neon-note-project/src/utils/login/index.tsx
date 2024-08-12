import { auth, provider } from "@/services/firebase";

export function handleSignin() {
  auth.signInWithPopup(provider).catch(alert);
};