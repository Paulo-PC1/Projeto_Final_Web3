import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ExerciseService, ExercisePractice } from '../../exercise/exercise.service';
import { AnswerService, AnswerResult } from '../answer.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

interface Attempt {
  value: number | null;
  sending: boolean;
}

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css'
})
export class PracticeComponent implements OnInit {

  exercises: ExercisePractice[] = [];
  categories: { id: number; name: string }[] = [];
  selectedCategory: number | null = null;

  loading = true;

  // Por exercício (chave = id): valor digitado e última resposta enviada
  attempts: Record<number, Attempt> = {};
  results: Record<number, AnswerResult> = {};

  constructor(
    private exerciseService: ExerciseService,
    private answerService: AnswerService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {
    try {
      const [exercises, history] = await Promise.all([
        this.exerciseService.listForPractice(),
        // O histórico é um complemento: se falhar, a tela continua útil sem ele
        this.answerService.listMine().catch(() => [] as AnswerResult[])
      ]);

      this.exercises = exercises;

      exercises.forEach(e => this.attempts[e.id] = { value: null, sending: false });

      // O histórico vem em ordem cronológica: a última tentativa de cada exercício vence
      history.forEach(h => this.results[h.exerciseId] = h);

      // Categorias que de fato têm exercícios, sem repetição
      const seen = new Map<number, string>();
      exercises.forEach(e => seen.set(e.categoryId, e.categoryName));
      this.categories = Array.from(seen, ([id, name]) => ({ id, name }));
    } catch (erro) {
      this.errorHandler.handle(erro);
    } finally {
      this.loading = false;
    }
  }

  get visibleExercises(): ExercisePractice[] {
    return this.selectedCategory === null
      ? this.exercises
      : this.exercises.filter(e => e.categoryId === this.selectedCategory);
  }

  get answeredCount(): number {
    return this.exercises.filter(e => this.results[e.id]).length;
  }

  get correctCount(): number {
    return this.exercises.filter(e => this.results[e.id]?.correct).length;
  }

  async submit(exercise: ExercisePractice): Promise<void> {
    const attempt = this.attempts[exercise.id];
    if (attempt.value === null || attempt.sending) {
      return;
    }

    attempt.sending = true;
    try {
      this.results[exercise.id] = await this.answerService.submit(exercise.id, attempt.value);
    } catch (erro) {
      this.errorHandler.handle(erro);
    } finally {
      attempt.sending = false;
    }
  }

}
