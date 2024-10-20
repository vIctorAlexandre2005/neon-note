import { signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';

export function Logout() {
  signOut(auth)
    .then(() => window.location.reload())
    .catch(error => alert(error.message));
}
