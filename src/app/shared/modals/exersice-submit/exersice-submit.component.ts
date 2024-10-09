import { Component, inject, ViewEncapsulation} from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ExerciseService } from 'src/app/shared/services/exercise.services';
import { IExercise } from 'src/app/shared/interfaces/exercises' 
import { CommonModule } from '@angular/common';
import { CardRowRightLeftComponent } from 'src/app/shared/components/card-row-right-left/card-row-right-left.component';

@Component({
  selector: 'app-exersice-submit',
  standalone: true,
  imports: [CommonModule, NgbModalModule, CardRowRightLeftComponent],
  templateUrl: './exersice-submit.component.html',
  styleUrl: './exersice-submit.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ExersiceSubmitComponent {
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

    approve() {
        this.exerciseService.getExerciseCategorization(this.exercise)
        .subscribe((result: IExercise)=>{
            this.exercise = result;
        })
    }

    closeModal(){
        this.modalRef.close(this.exercise);
    }
}
