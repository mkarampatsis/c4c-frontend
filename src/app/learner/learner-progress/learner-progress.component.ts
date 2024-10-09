import { Component, inject, output, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { GridLoadingOverlayComponent } from 'src/app/shared/modals/grid-loading-overlay/grid-loading-overlay.component';
import { ActionIconsLearnerComponent } from 'src/app/shared/components/action-icons-learner/action-icons-learner.component';
import { ExerciseService } from 'src/app/shared/services/exercise.services';
import { IUserTraining } from 'src/app/shared/interfaces/exercises';
import { ConstService } from 'src/app/shared/services/const.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';

@Component({
  selector: 'app-learner-progress',
  standalone: true,
  imports: [AgGridAngular, GridLoadingOverlayComponent, NgbProgressbarModule],
  templateUrl: './learner-progress.component.html',
  styleUrl: './learner-progress.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LearnerProgressComponent {
    authService = inject(AuthService);
    constService = inject(ConstService);
    exerciseService = inject(ExerciseService);
    exercises: IUserTraining[] = [];

    user = this.authService.user().email

    pyCountTrainingExercises: number;
    jsCountTrainingExercises: number;
    pyExercisesSolved: number;
    pyChaptersCovered: number;
    pyExercisesCorrect: any;
    pyExercisesWrong: number;
    jsExercisesSolved: number;
    jsChaptersCovered: number;
    jsExercisesCorrect: number;
    jsExercisesWrong: number;

    defaultColDef = this.constService.defaultColDef;

    colDefs: ColDef[] = [
        // { field: 'email', headerName: 'Learner', flex: 1 },
        { field: 'exercise.type', headerName: 'Course', flex: 1 },
        { field: 'exercise.category.chapter', headerName: 'Chapter'},
        { field: 'exercise.difficulty', headerName: 'Difficulty Level'},
        { field: 'answer', headerName: "User's Code"},
        // { field: 'exercise.output', headerName: 'Correct Answer'},
        { 
            field: 'output', 
            headerName: "User's Output",
            // cellStyle: params => {
            //     const output = params.data.exercise.output.replace("type=oneline ", "").trim()
            //     if (params.value === output) {
            //         //mark police cells as red
            //         return {color: 'red', backgroundColor: 'green'};
            //     } else {
            //         return {color: 'green', backgroundColor: 'red'};
            //     }
            //     return null;
            // }
        },
        { field: 'actionCell', headerName: 'Actions', cellRenderer: ActionIconsLearnerComponent,  filter: false, sortable: false, floatingFilter:false, flex: 1, resizable: false},
    ];
    autoSizeStrategy = this.constService.autoSizeStrategy;
    
    loadingOverlayComponent = GridLoadingOverlayComponent;
    loadingOverlayComponentParams = { loadingMessage: 'Exercise loading...' };

    gridApi: GridApi<IUserTraining>;

    constructor() {
        this.exerciseService.getTrainingExercisesByUserCategoryCourse(this.user, 'learner', 'python')
        .subscribe((data) => {
            this.pyCountTrainingExercises = data.length;
        });

        this.exerciseService.getTrainingExercisesByUserCategoryCourse(this.user, 'learner', 'javascript')
        .subscribe((data) => {
            this.jsCountTrainingExercises = data.length
        });

        this.exerciseService.getCourseChapters('python')
        .subscribe((data) => {
            this.pyExercisesSolved = (this.pyCountTrainingExercises * 100)/data['numOfExercises']
            this.pyChaptersCovered = data['numOfTrainingByChapter'].length 
            // console.log(data)
            // this.pyExercisesCorrect = this.exercises.filter((data)=>{
            //     const correctAnswer = data.exercise.output[0].replace('type=oneline\n', '').trim()
            //     console.log("1>>>",output.toString(),"2>>>", correctAnswer.toString())
            //     return true
            // }) 
        });

        this.exerciseService.getCourseChapters('javascript')
        .subscribe((data) => {
            this.jsExercisesSolved = (this.jsCountTrainingExercises * 100)/data['numOfExercises']
            this.jsChaptersCovered = data['numOfTrainingByChapter'].length 
        });
    }

    onGridReady(params: GridReadyEvent<IUserTraining>): void {
        this.gridApi = params.api;
        this.gridApi.showLoadingOverlay();
        this.exerciseService
            .getUsersTrainingExercises(this.authService.user().email)
            .pipe(
                take(1),
            )
            .subscribe((data) => {
                this.gridApi.hideOverlay();
                this.exercises = data;
            });
    }
}
