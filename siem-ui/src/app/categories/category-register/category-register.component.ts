import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { CategoryService, Category } from '../category.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageComponent } from '../../shared/message/message.component';

@Component({
  selector: 'app-category-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    MessageComponent
  ],
  templateUrl: './category-register.component.html',
  styleUrl: './category-register.component.css'
})
export class CategoryRegisterComponent implements OnInit {

  category: Category = { categoryName: '', description: '' };

  constructor(
    private categoryService: CategoryService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id && id !== 'new') {
      this.loadCategory(Number(id));
    }
  }

  get editing(): boolean {
    return Boolean(this.category.id);
  }

  loadCategory(id: number): void {
    this.categoryService.findById(id)
      .then(category => this.category = category)
      .catch(erro => this.errorHandler.handle(erro));
  }

  save(): void {
    if (this.editing) {
      this.update();
    } else {
      this.add();
    }
  }

  add(): void {
    this.categoryService.add(this.category)
      .then(addedCategory => {
        this.messageService.add({ severity: 'success', detail: 'Categoria adicionada com sucesso!' });
        this.router.navigate(['/categories', addedCategory.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  update(): void {
    this.categoryService.update(this.category)
      .then(updatedCategory => {
        this.messageService.add({ severity: 'success', detail: 'Categoria editada com sucesso!' });
        this.category = updatedCategory;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  new(categoryForm: NgForm): void {
    this.category = { categoryName: '', description: '' };
    categoryForm.reset();
    this.router.navigate(['/categories/new']);
  }

}
