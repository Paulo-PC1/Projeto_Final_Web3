import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ExerciseService, Exercise } from '../exercise.service';
import { CategoryService, Category } from '../../categories/category.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageComponent } from '../../shared/message/message.component';

// Modelo do formulário. Fica separado da interface Exercise porque na API a categoria é um
// objeto ({ id }), enquanto o <select> trabalha só com o número do id.
interface ExerciseForm {
  id?: number;
  statement: string;
  operation: string;
  correctAnswer: number | null;
  active: boolean;
  categoryId: number | null;
}

@Component({
  selector: 'app-exercise-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    MessageComponent
  ],
  templateUrl: './exercise-register.component.html',
  styleUrl: './exercise-register.component.css'
})
export class ExerciseRegisterComponent implements OnInit {

  form: ExerciseForm = this.emptyForm();
  categories: Category[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private categoryService: CategoryService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();

    const id = this.route.snapshot.params['id'];
    if (id && id !== 'new') {
      this.loadExercise(Number(id));
    }
  }

  get editing(): boolean {
    return Boolean(this.form.id);
  }

  loadCategories(): void {
    this.categoryService.list()
      .then(result => this.categories = result)
      .catch(erro => this.errorHandler.handle(erro));
  }

  loadExercise(id: number): void {
    this.exerciseService.findById(id)
      .then(exercise => {
        this.form = {
          id: exercise.id,
          statement: exercise.statement,
          operation: exercise.operation ?? '',
          correctAnswer: exercise.correctAnswer,
          active: exercise.active,
          categoryId: exercise.categoryId?.id ?? null
        };
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  save(): void {
    const payload: Exercise = {
      id: this.form.id,
      statement: this.form.statement.trim(),
      operation: this.form.operation.trim() || null,
      correctAnswer: this.form.correctAnswer as number,
      active: this.form.active,
      // A API só precisa do id da categoria
      categoryId: { id: this.form.categoryId! }
    };

    const request = this.editing
      ? this.exerciseService.update(payload)
      : this.exerciseService.add(payload);

    request
      .then(() => {
        this.messageService.add({
          severity: 'success',
          detail: this.editing ? 'Exercício editado com sucesso!' : 'Exercício adicionado com sucesso!'
        });
        this.router.navigate(['/exercises']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private emptyForm(): ExerciseForm {
    return { statement: '', operation: '', correctAnswer: null, active: true, categoryId: null };
  }

}
