import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from './my-preset';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MessageService, ConfirmationService } from 'primeng/api';

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptorsFromDi() // necessário para os interceptores do JwtModule funcionarem
    ),
    provideRouter(routes),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8080'],
          disallowedRoutes: [
            'http://localhost:8080/auth/login',
            'http://localhost:8080/auth/refresh',
            'http://localhost:8080/user'
          ]
        }
      })
    ),
    JwtHelperService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset
      }
    }),
    // Providers globais: assim qualquer componente da aplicação consegue
    // injetar MessageService/ConfirmationService, sem depender de estarem
    // declarados no AppComponent nem da posição do <router-outlet>.
    MessageService,
    ConfirmationService
  ]
};