import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule} from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-dificculty',
  standalone: true,
  imports: [CommonModule, NgbModalModule,ReactiveFormsModule ],
  templateUrl: './exercise-difficulty.component.html',
  styleUrl: './exercise-difficulty.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ExerciseDificcultyComponent {

    difficulty: string;
    modalRef: any;

    form = new FormGroup({
        difficulty: new FormControl(''),
    });

    ngAfterViewInit() {
        this.form.controls.difficulty.setValue(this.difficulty)
    }

    submit(difficulty:string){
        this.modalRef.close(difficulty);
    }
}
