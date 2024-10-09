import { Component, inject, ViewEncapsulation, effect } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ExerciseService } from 'src/app/shared/services/exercise.services';
import { IUserTraining } from 'src/app/shared/interfaces/exercises';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { take, Observable } from 'rxjs';

@Component({
  selector: 'app-learner-rate-evaluation',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './learner-exercise-rate.component.html',
  styleUrl: './learner-exercise-rate.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LearnerExerciseRateComponent {
    authService = inject(AuthService);
    exerciseService = inject(ExerciseService);
    modalService = inject(ModalService);
    exercises: IUserTraining[] = [];

    constructor() {
       
        this.getUsersTrainingExercises()

        effect(() => {
            if (this.exerciseService.trainingExercises()){
                this.getUsersTrainingExercises()
            }
        });
    }
    
    rateModal(exercise: IUserTraining){
        this.modalService.showExerciseRateLearner(exercise);
    }
    
    getUsersTrainingExercises(){
        this.exerciseService
        .getUsersTrainingExercises(this.authService.user().email)
        .pipe(
            take(1),
        )
        .subscribe((data) => {
            this.exercises = data;
        });
    }
}
