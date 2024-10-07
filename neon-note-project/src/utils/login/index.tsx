import { auth, provider } from "@/services/firebase";

export function handleSignin() {
  auth.signInWithPopup(provider).then(() => window.location.reload()).catch(alert);
};