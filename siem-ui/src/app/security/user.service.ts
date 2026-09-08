import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

// Corresponde ao corpo esperado pelo endpoint público POST /user
// (depois da correção no SecurityConfig/UserController). Ativo e permissões
// padrão são definidos pelo próprio back-end, não precisam vir daqui.
export interface NewUser {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  async register(user: NewUser): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(this.http.post(this.usersUrl, user, { headers }));
  }

}
