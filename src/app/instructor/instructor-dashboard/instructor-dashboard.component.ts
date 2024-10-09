import { Component, inject } from '@angular/core';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExerciseService } from 'src/app/shared/services/exercise.services';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent {
    authService = inject(AuthService);
    exerciseService = inject(ExerciseService);
    router = inject(Router);
    
    pyCountAuthoringExercises: number;
    jsCountAuthoringExercises: number;

    email: string = this.authService.user().email

    constructor(){
        this.exerciseService.getExercisesByUserAndCourse(this.email, 'python')
        .subscribe((data) => {
            this.pyCountAuthoringExercises = data.length
        });

        this.exerciseService.getExercisesByUserAndCourse(this.email, 'javascript')
        .subscribe((data) => {
            this.jsCountAuthoringExercises = data.length
        });
    }
    goToAuthoringTool(course: string){
        this.router.navigate(['c4c/authoring-tool/', course]);
    }

    enrollToAuthoringTool(){
        this.router.navigate(['c4c/payform', 'instructor']);
    }
}
