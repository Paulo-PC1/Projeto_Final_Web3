import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

// Espelha a entidade Category do back-end (domain/model/Category.java).
// categoryName: 10 a 150 caracteres | description: 20 a 200 caracteres (regras do @Size na API)
export interface Category {
  id?: number;
  categoryName: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesUrl = 'http://localhost:8080/category';

  constructor(private http: HttpClient) { }

  async list(): Promise<Category[]> {
    return await firstValueFrom(this.http.get<Category[]>(this.categoriesUrl));
  }

  async findById(id: number): Promise<Category> {
    return await firstValueFrom(this.http.get<Category>(`${this.categoriesUrl}/${id}`));
  }

  async add(category: Category): Promise<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.post<Category>(this.categoriesUrl, category, { headers })
    );
  }

  async update(category: Category): Promise<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.put<Category>(`${this.categoriesUrl}/${category.id}`, category, { headers })
    );
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.categoriesUrl}/${id}`));
  }

}
