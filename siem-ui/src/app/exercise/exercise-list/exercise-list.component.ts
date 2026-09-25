import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { ConfirmationService, MessageService } from "primeng/api";
import { ExerciseService, Exercise } from "../exercise.service";
import { ErrorHandlerService } from "../../core/error-handler.service";

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
  templateUrl: '.exercise-list.component.html',
  styleUrl: './exercise-list-component.css'
})
export class ExerciseListComponent implements OnInit {

  exercises: Exercise[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private confirmation: ConfirmationService,
    private mensageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.exerciseService.list()
      .then(result => this.exercises = result)
      .catch(erro => this.errorHandler.handle(erro))
  }

  confirmRemoval(exercise: Exercise): void {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir o exercício "${exercise.exerciseName}"?`,
      accept: () => this.delete(exercise)
    });
  }

  delete(exercise: Exercise): void {
    this.exerciseService.delete(exercise.id!)
      .then(() => {
        this.list();
        this.mensageService.add({ severity: 'success', detail: 'Exercício excluído com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  
}
