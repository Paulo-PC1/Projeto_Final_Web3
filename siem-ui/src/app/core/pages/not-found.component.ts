import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Rota curinga ('**'): qualquer endereço que não exista cai aqui.
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page page-narrow">
      <h1>Página não encontrada</h1>
      <p>O endereço que você acessou não existe ou foi removido.</p>
      <p><a routerLink="/">Voltar para o início</a></p>
    </div>
  `
})
export class NotFoundComponent { }
