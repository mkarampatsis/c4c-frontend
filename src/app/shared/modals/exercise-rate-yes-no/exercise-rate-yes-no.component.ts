import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { IUserTraining } from 'src/app/shared/interfaces/exercises';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CardRowRightLeftComponent } from 'src/app/shared/components/card-row-right-left/card-row-right-left.component';

@Component({
  selector: 'app-exercise-rate-yes-no',
  standalone: true,
  imports: [CommonModule, NgbModalModule, CardRowRightLeftComponent, ReactiveFormsModule],
  templateUrl: './exercise-rate-yes-no.component.html',
  styleUrl: './exercise-rate-yes-no.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ExerciseRateYesNoComponent {
    exercise: IUserTraining | null = null;
    
    modalRef: any;

    form = new FormGroup({
        rate: new FormControl('', Validators.required),
    })

    submitRate(){
        const data = {
            id: this.exercise._id,
            rate: this.form.controls.rate.value
        }
        this.modalRef.close(data);
    }
}
