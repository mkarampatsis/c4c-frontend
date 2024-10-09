import { Component, inject } from '@angular/core';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserEvaluationService } from 'src/app/shared/services/evaluation.service';
import { ExerciseService } from 'src/app/shared/services/exercise.services';

@Component({
  selector: 'app-learner-dashboard',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './learner-dashboard.component.html',
  styleUrl: './learner-dashboard.component.css'
})
export class LearnerDashboardComponent {
    authService = inject(AuthService);
    evaluationService = inject(UserEvaluationService)
    exerciseService = inject(ExerciseService);
    router = inject(Router);

    pyCountTrainingExercises: number;
    jsCountTrainingExercises: number;

    email: string = this.authService.user().email

    constructor() {
        this.exerciseService.getTrainingExercisesByUserCategoryCourse(this.email, 'learner', 'python')
        .subscribe((data) => {
            this.pyCountTrainingExercises = data.length
        });

        this.exerciseService.getTrainingExercisesByUserCategoryCourse(this.email, 'learner', 'javascript')
        .subscribe((data) => {
            this.jsCountTrainingExercises = data.length
        });
    }

    checkForEvaluation(course: string) {
        if (this.evaluationService.courseEvalution(course)){
            this.router.navigateByUrl('c4c/learner/' + course);
        } else {
            this.router.navigateByUrl('c4c/learner/'+ course + '/evalution');
        }
    }

    goToAuthoringTool(course: string){
        this.router.navigate(['c4c/authoring-tool/', course]);
    }

    enrollToCourse(){
        this.router.navigate(['c4c/payform', 'learner']);
    }

    enrollToAuthoringTool(){
        this.router.navigate(['c4c/payform', 'instructor']);
    }
}
