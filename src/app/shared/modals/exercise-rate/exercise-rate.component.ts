import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { IUserTraining } from 'src/app/shared/interfaces/exercises';
import { CommonModule} from '@angular/common';
import { CardRowRightLeftComponent } from 'src/app/shared/components/card-row-right-left/card-row-right-left.component';

@Component({
  selector: 'app-exercise-evaluation',
  standalone: true,
  imports: [CommonModule, NgbModalModule, CardRowRightLeftComponent],
  templateUrl: './exercise-rate.component.html',
  styleUrl: './exercise-rate.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ExerciseRateComponent {
   
    exercise: IUserTraining | null = null;
    
    modalRef: any;
    
    submitRate(value:string){
        const data = {
            exercise: this.exercise.exercise,
            rate: value
        }
        this.modalRef.close(data);
    }
}
