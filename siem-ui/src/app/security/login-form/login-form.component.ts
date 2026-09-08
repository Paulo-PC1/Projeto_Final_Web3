import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login(email: string, password: string): void {
    this.auth.login(email, password)
      .then(() => {
        this.router.navigate(['/categories']);
      })
      .catch(erro => {
        this.msg = erro;
      });
  }

}
