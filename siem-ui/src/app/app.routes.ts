import { Routes } from '@angular/router';
import { LoginFormComponent } from './security/login-form/login-form.component';
import { RegisterFormComponent } from './security/register-form/register-form.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryRegisterComponent } from './categories/category-register/category-register.component';

export const routes: Routes = [
  // Precisa vir antes de 'categories' pois ambas as rotas usam o mesmo
  // componente: id = 'new' -> cadastro | id = <numero> -> edição
  { path: 'categories/:id', component: CategoryRegisterComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
