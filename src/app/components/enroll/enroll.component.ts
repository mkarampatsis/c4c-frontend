import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExerciseService } from 'src/app/shared/services/exercise.services';
import { IProfileUpdateReply } from 'src/app/shared/interfaces/profileUpdateReply.interface';
import { IProfileUpdateRequest } from 'src/app/shared/interfaces/profileUpdateRequest.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-enroll',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './enroll.component.html',
  styleUrl: './enroll.component.css'
})
export class EnrollComponent {
    authService = inject(AuthService);
    exerciseService = inject(ExerciseService);

    pyCountTrainingExercises: number;
    jsCountTrainingExercises: number;
    pyCountAuthoringExercises: number;
    jsCountAuthoringExercises: number;

    pyCheckForTrialLearner: boolean;
    jsCheckForTrialLearner: boolean;
    pyCheckForTrialInstructor: boolean;
    jsCheckForTrialInstructor: boolean;

    user = this.authService.user().email
    router = inject(Router);

    tryForFree: boolean = true;

    constructor() {
        this.exerciseService.getTrainingExercisesByUserCategoryCourse(this.user, 'learner', 'python')
        .subscribe((data) => {
            this.pyCountTrainingExercises = data.length;
            this.pyCheckForTrialLearner = true? this.pyCountTrainingExercises<10: false;
        });

        this.exerciseService.getTrainingExercisesByUserCategoryCourse(this.user, 'learner', 'javascript')
        .subscribe((data) => {
            this.jsCountTrainingExercises = data.length
            this.jsCheckForTrialLearner = true? this.jsCountTrainingExercises<10: false;
        });

        this.exerciseService.getTrainingExercisesByUserCategoryCourse(this.user, 'instructor', 'python')
        .subscribe((data) => {
            this.pyCountAuthoringExercises = data.length
            this.pyCheckForTrialInstructor = true? this.pyCountAuthoringExercises<10: false;
        });

        this.exerciseService.getTrainingExercisesByUserCategoryCourse(this.user, 'instructor', 'javascript')
        .subscribe((data) => {
            this.jsCountAuthoringExercises = data.length
            this.jsCheckForTrialInstructor = true? this.jsCountAuthoringExercises<10: false;
        });
    }

    enroll(category: string, course: string){
       
        const data = { category, course } as IProfileUpdateRequest;
        this.authService
        .updateProfile(data)
        .pipe(take(1))
        .subscribe({
            next: (res: IProfileUpdateReply) => {
                this.authService.user.set(res.user);
                this.router.navigate(['c4c', category, 'dashboard']);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
