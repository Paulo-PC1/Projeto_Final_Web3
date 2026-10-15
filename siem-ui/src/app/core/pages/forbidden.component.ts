import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Destino do guard quando o usuário está logado, mas não tem a permissão da rota.
@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page page-narrow">
      <h1>Acesso negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <p><a routerLink="/">Voltar para o início</a></p>
    </div>
  `
})
export class ForbiddenComponent { }
