import { Component, inject, ViewEncapsulation } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ExerciseService } from 'src/app/shared/services/exercise.services';
import { IExercise } from 'src/app/shared/interfaces/exercises' 
import { CommonModule} from '@angular/common';
import { CardRowRightLeftComponent } from 'src/app/shared/components/card-row-right-left/card-row-right-left.component';

@Component({
  selector: 'app-exercise-details-learner',
  standalone: true,
  imports: [CommonModule, NgbModalModule, CardRowRightLeftComponent],
  templateUrl: './exercise-details-learner.component.html',
  styleUrl: './exercise-details-learner.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ExerciseDetailsLearnerComponent {
    exerciseService = inject(ExerciseService);
   
    exercise: IExercise | null = null;
   
    modalRef: any;
    
    ngOnInit() {
        if (this.exercise.output.length>0) {
            this.exercise.output = [this.exercise?.output[0].replace('type=oneline\n', '').trim()]
        } else {
            this.exercise.output = []
        }
    }
}
