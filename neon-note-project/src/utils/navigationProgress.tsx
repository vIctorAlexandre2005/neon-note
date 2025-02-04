import { NextRouter, useRouter } from 'next/router';
import nProgress from 'nprogress';
import { errorToast } from './toasts/toasts';

export function handleNavigation(router: NextRouter, url: string) {
  try {
    nProgress.start(); // Inicia a barra de carregamento
    router.push(url).finally(() => nProgress.done()); // Finaliza quando a navegação termina
  } catch (error) {
    console.error('Erro ao navegar para a URL:', error);
    errorToast('Erro ao navegar para a URL, tente novamente.');
  }
}
