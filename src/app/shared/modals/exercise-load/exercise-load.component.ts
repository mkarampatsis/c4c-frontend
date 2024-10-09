import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { IExercise } from 'src/app/shared/interfaces/exercises';
import { ExerciseService } from '../../services/exercise.services';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-exercise-load',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  templateUrl: './exercise-load.component.html',
  styleUrl: './exercise-load.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ExerciseLoadComponent {
    authService = inject(AuthService);
    exersiceServise = inject(ExerciseService);

    email = this.authService.user().email

    course: string;
    exercises: IExercise[] | null = null;
    
    modalRef: any;

    ngAfterViewInit() {
        this.exersiceServise.getExercisesByUserAndCourse(this.email, this.course)
        .subscribe((result) => {
            this.exercises = result;
        })
    }

    loadExercise(exercise: IExercise){
        this.modalRef.close(exercise);
    }
}
