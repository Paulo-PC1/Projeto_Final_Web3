import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService, Category } from '../category.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    RouterModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.categoryService.list()
      .then(result => this.categories = result)
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmRemoval(category: Category): void {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir a categoria "${category.categoryName}"?`,
      accept: () => this.delete(category)
    });
  }

  delete(category: Category): void {
    this.categoryService.delete(category.id!)
      .then(() => {
        this.list();
        this.messageService.add({ severity: 'success', detail: 'Categoria excluída com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
