import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { Permission } from './core/permissions';

// Todas as telas são carregadas sob demanda (loadComponent): o bundle inicial fica
// só com o núcleo do Angular e cada tela vira um chunk separado, baixado no 1º acesso.
//
// Rotas protegidas usam o authGuard. A lista em data.permissions é o conjunto de
// permissões que o usuário precisa ter TODAS para entrar (ver core/guards/auth.guard.ts).
export const routes: Routes = [
  // --- Públicas ---
  {
    path: 'login',
    title: 'Entrar - SIEM',
    loadComponent: () => import('./security/login-form/login-form.component')
      .then(m => m.LoginFormComponent)
  },
  {
    path: 'register',
    title: 'Criar conta - SIEM',
    loadComponent: () => import('./security/register-form/register-form.component')
      .then(m => m.RegisterFormComponent)
  },

  // --- Aluno: resolver exercícios ---
  {
    path: 'practice',
    title: 'Praticar - SIEM',
    canActivate: [authGuard],
    data: { permissions: [Permission.SEARCH_EXERCISE, Permission.REGISTER_ANSWER, Permission.SEARCH_ANSWER] },
    loadComponent: () => import('./answers/practice/practice.component')
      .then(m => m.PracticeComponent)
  },

  // --- Exercícios (cadastro) ---
  // Mesmo padrão das categorias: a rota com :id vem primeiro.
  // id = 'new' -> cadastro | id = <numero> -> edição
  {
    path: 'exercises/:id',
    title: 'Exercício - SIEM',
    canActivate: [authGuard],
    data: { permissions: [Permission.SEARCH_EXERCISE, Permission.REGISTER_EXERCISE] },
    loadComponent: () => import('./exercise/exercise-register/exercise-register.component')
      .then(m => m.ExerciseRegisterComponent)
  },
  {
    path: 'exercises',
    title: 'Exercícios - SIEM',
    canActivate: [authGuard],
    data: { permissions: [Permission.SEARCH_EXERCISE, Permission.REGISTER_EXERCISE] },
    loadComponent: () => import('./exercise/exercise-list/exercise-list.component')
      .then(m => m.ExerciseListComponent)
  },

  // --- Categorias ---
  // Precisa vir antes de 'categories' pois ambas as rotas usam o mesmo
  // componente: id = 'new' -> cadastro | id = <numero> -> edição
  {
    path: 'categories/:id',
    title: 'Categoria - SIEM',
    canActivate: [authGuard],
    data: { permissions: [Permission.REGISTER_CATEGORY] },
    loadComponent: () => import('./categories/category-register/category-register.component')
      .then(m => m.CategoryRegisterComponent)
  },
  {
    path: 'categories',
    title: 'Categorias - SIEM',
    canActivate: [authGuard],
    data: { permissions: [Permission.SEARCH_CATEGORY] },
    loadComponent: () => import('./categories/category-list/category-list.component')
      .then(m => m.CategoryListComponent)
  },

  // --- Utilitárias ---
  {
    path: 'forbidden',
    title: 'Acesso negado - SIEM',
    loadComponent: () => import('./core/pages/forbidden.component')
      .then(m => m.ForbiddenComponent)
  },
  { path: '', redirectTo: 'practice', pathMatch: 'full' },

  // Curinga: TEM que ser a última, senão engole as rotas que vêm depois dela.
  {
    path: '**',
    title: 'Página não encontrada - SIEM',
    loadComponent: () => import('./core/pages/not-found.component')
      .then(m => m.NotFoundComponent)
  }
];
