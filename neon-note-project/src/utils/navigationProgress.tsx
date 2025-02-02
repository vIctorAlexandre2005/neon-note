import { NextRouter, useRouter } from 'next/router';
import nProgress from 'nprogress';

export function handleNavigation(router: NextRouter, url: string) {
  nProgress.start(); // Inicia a barra de carregamento
  router.push(url).finally(() => nProgress.done()); // Finaliza quando a navegação termina
};
