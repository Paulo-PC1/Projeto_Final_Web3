import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { UserService } from '../user.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageComponent } from '../../shared/message/message.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    MessageComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router
  ) { }

  register(registerForm: NgForm): void {
    if (this.password !== this.confirmPassword) {
      this.messageService.add({ severity: 'error', detail: 'As senhas não coincidem' });
      return;
    }

    this.userService.register({
      name: this.name,
      email: this.email,
      password: this.password
    })
      .then(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Cadastro realizado com sucesso! Faça login para continuar.'
        });
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
