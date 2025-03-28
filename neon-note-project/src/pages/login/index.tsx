import { LoginComponent } from '@/components/Login';
import { useContextGlobal } from '@/Context';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const { user } = useContextGlobal();
  const router = useRouter();

  if (!user) {
    return <LoginComponent />;
  } else {
    router.push('/');
  }
}
