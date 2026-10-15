import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExerciseService, Exercise } from '../exercise.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../security/auth.service';
import { Permission } from '../../core/permissions';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    RouterModule
  ],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent implements OnInit {

  exercises: Exercise[] = [];

  // Exposto ao template para condicionar botões: auth.hasPermission(perm.XXX)
  readonly perm = Permission;

  constructor(
    public auth: AuthService,
    private exerciseService: ExerciseService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.list();
  }

  // A coluna "Ações" só existe se o usuário puder fazer pelo menos uma delas
  get showActions(): boolean {
    return this.auth.hasPermission(this.perm.REGISTER_EXERCISE)
      || this.auth.hasPermission(this.perm.REMOVE_EXERCISE);
  }

  list(): void {
    this.exerciseService.list()
      .then(result => this.exercises = result)
      .catch(erro => this.errorHandler.handle(erro));
  }

  // Enunciado resumido, usado na confirmação e nos rótulos dos botões (leitor de tela)
  summary(exercise: Exercise): string {
    const text = exercise.statement.trim();
    return text.length > 50 ? text.substring(0, 50) + '…' : text;
  }

  confirmRemoval(exercise: Exercise): void {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir o exercício "${this.summary(exercise)}"?`,
      accept: () => this.delete(exercise)
    });
  }

  delete(exercise: Exercise): void {
    this.exerciseService.delete(exercise.id!)
      .then(() => {
        this.list();
        this.messageService.add({ severity: 'success', detail: 'Exercício excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  toggleActive(exercise: Exercise): void {
    const newValue = !exercise.active;
    this.exerciseService.updateActive(exercise.id!, newValue)
      .then(() => {
        exercise.active = newValue;
        this.messageService.add({
          severity: 'success',
          detail: newValue ? 'Exercício ativado!' : 'Exercício desativado!'
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
