import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  msg: string = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  login(email: string, password: string): void {
    this.msg = '';
    this.loading = true;

    this.auth.login(email, password)
      .then(() => {
        this.router.navigateByUrl(this.targetUrl());
      })
      .catch(erro => {
        this.msg = erro;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  // Volta para a página que o guard interrompeu (?returnUrl=...). Só aceita caminhos
  // internos ("/algo"), nunca um endereço externo, para não virar redirecionamento aberto.
  private targetUrl(): string {
    const url = this.route.snapshot.queryParamMap.get('returnUrl');
    return url && url.startsWith('/') && !url.startsWith('//') ? url : '/practice';
  }

}
