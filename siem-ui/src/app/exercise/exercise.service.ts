import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Category } from '../categories/category.service';

// Espelha a entidade Exercise do back-end (domain/model/Exercise.java).
// Atenção ao nome: na API o campo da categoria chama-se "categoryId", mas carrega o
// OBJETO categoria. Para gravar basta enviar { id: <numero> }.
export interface Exercise {
  id?: number;
  statement: string;
  operation: string | null;
  correctAnswer: number;
  active: boolean;
  categoryId: Partial<Category>;
}

// Visão do exercício para quem vai resolver (GET /exercise/practice): igual ao
// exercício, só que SEM o gabarito.
export interface ExercisePractice {
  id: number;
  statement: string;
  operation: string | null;
  categoryId: number;
  categoryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercisesUrl = 'http://localhost:8080/exercise';

  constructor(private http: HttpClient) { }

  async list(): Promise<Exercise[]> {
    return await firstValueFrom(this.http.get<Exercise[]>(this.exercisesUrl));
  }

  async listForPractice(): Promise<ExercisePractice[]> {
    return await firstValueFrom(this.http.get<ExercisePractice[]>(`${this.exercisesUrl}/practice`));
  }

  async findById(id: number): Promise<Exercise> {
    return await firstValueFrom(this.http.get<Exercise>(`${this.exercisesUrl}/${id}`));
  }

  async add(exercise: Exercise): Promise<Exercise> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.post<Exercise>(this.exercisesUrl, exercise, { headers })
    );
  }

  async update(exercise: Exercise): Promise<Exercise> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.put<Exercise>(`${this.exercisesUrl}/${exercise.id}`, exercise, { headers })
    );
  }

  // PUT /exercise/{id}/active com corpo true/false (204 sem conteúdo)
  async updateActive(id: number, active: boolean): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    await firstValueFrom(
      this.http.put<void>(`${this.exercisesUrl}/${id}/active`, active, { headers })
    );
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.exercisesUrl}/${id}`));
  }

}
