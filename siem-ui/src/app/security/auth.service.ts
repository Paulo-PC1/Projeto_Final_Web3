import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'http://localhost:8080/auth/login';

  // Payload decodificado do access token. Na API SIEM ele contém:
  // sub (e-mail do usuário), authorities (string com as permissões separadas por espaço),
  // iat e exp. Não existe claim de id/nome do usuário (diferente do exemplo do professor).
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.loadToken();
  }

  async login(email: string, password: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    // A API espera os campos "username" e "password" no corpo da requisição.
    // Nesta API, o "username" É o e-mail cadastrado (ver AppUserDetailsService).
    const body = {
      username: email,
      password: password
    };

    try {
      const response: any = await firstValueFrom(
        this.http.post(this.loginUrl, body, { headers })
      );
      this.storeToken(response.accessToken);
    } catch (erro: any) {
      console.error(erro);
      // Pressupõe que o AuthController agora captura a AuthenticationException
      // e responde 401 (ver correção do item 3). Qualquer outro status
      // (500, erro de rede, etc.) é tratado como falha de comunicação.
      if (erro.status === 401) {
        return Promise.reject('E-mail e/ou senha inválidos!');
      }
      return Promise.reject('Não foi possível conectar ao servidor. Tente novamente.');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  // Utilitário opcional: permite esconder/mostrar botões no HTML de acordo
  // com a permissão do usuário logado, ex: *ngIf="auth.hasPermission('ROLE_REGISTER_CATEGORY')"
  hasPermission(permission: string): boolean {
    const authorities: string = this.jwtPayload?.authorities ?? '';
    return authorities.split(' ').includes(permission);
  }

  private storeToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.storeToken(token);
    }
  }

}
