import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { UserService } from '../user.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageComponent } from '../../shared/message/message.component';
import { MatchValueDirective } from '../../shared/match-value.directive';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    MessageComponent,
    MatchValueDirective
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

  // A conferência de "confirmar senha" é feita no próprio campo (MatchValueDirective), e o
  // botão fica desabilitado enquanto o formulário for inválido. Esta checagem é só uma
  // segunda barreira, caso o envio aconteça por outro caminho (ex.: Enter).
  register(): void {
    if (this.password !== this.confirmPassword) {
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
