import { useOnlineStatus } from '@/hooks/Connection/onlineStatus';
import { errorToast } from '@/utils/toasts/toasts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function ConnectionStatus() {
  const isOnline = useOnlineStatus();
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isOnline) {
      setShowOfflineMessage(true);
    } else {
      setShowOfflineMessage(false);
    }
  }, [isOnline]);

  if (!isOnline) {
    router.push('/error');
    errorToast('Perdi sua conexão!');
  };

  return null;
};