import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/services/firebase";

export function handleSignin() {
  signInWithPopup(auth, provider)
    .then(() => window.location.reload())
    .catch((error) => alert(error.message));
}
