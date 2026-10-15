import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

// Resultado de uma tentativa (AnswerResponse no back-end). A API decide se está correta
// e só então devolve o gabarito.
export interface AnswerResult {
  id: number;
  exerciseId: number;
  userAnswer: number;
  correct: boolean;
  correctAnswer: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  answersUrl = 'http://localhost:8080/user_Answer';

  constructor(private http: HttpClient) { }

  // O usuário NÃO é enviado: a API pega do token (o JWT só tem o e-mail, não o id).
  async submit(exerciseId: number, answer: number): Promise<AnswerResult> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.post<AnswerResult>(this.answersUrl, { exerciseId, answer }, { headers })
    );
  }

  // Histórico do próprio usuário logado, em ordem cronológica
  async listMine(): Promise<AnswerResult[]> {
    return await firstValueFrom(this.http.get<AnswerResult[]>(`${this.answersUrl}/mine`));
  }

}
