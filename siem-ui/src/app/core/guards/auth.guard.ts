import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../security/auth.service';

/**
 * Guard único para as rotas protegidas.
 *
 * 1) Sem login (ou token expirado) -> /login, guardando a rota pedida em ?returnUrl
 *    para voltar a ela depois de entrar.
 * 2) Logado, mas sem alguma das permissões listadas em `data.permissions` da rota
 *    -> /forbidden. Exige TODAS as permissões listadas.
 *
 * A checagem no front serve para a experiência do usuário; quem realmente protege os
 * dados é o @ PreAuthorize da API.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    auth.logout(); // descarta um token vencido que ainda esteja no localStorage
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  const required: string[] = route.data['permissions'] ?? [];
  const allowed = required.every(permission => auth.hasPermission(permission));

  return allowed ? true : router.createUrlTree(['/forbidden']);
};
