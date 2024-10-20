import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/services/firebase';
import { useContextGlobal } from '@/Context';

export function handleSignin() {
  try {
    signInWithPopup(auth, provider)
      .then(() => window.location.reload())
      .catch(error => alert(error.message));
  } catch (error) {
    console.error(error);
  }
}
