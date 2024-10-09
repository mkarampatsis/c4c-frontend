import { Component, inject, ViewEncapsulation  } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { GridLoadingOverlayComponent } from 'src/app/shared/modals/grid-loading-overlay/grid-loading-overlay.component';
import { ActionIconsComponent } from 'src/app/shared/components/action-icons/action-icons.component';
import { ExerciseService } from 'src/app/shared/services/exercise.services';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IExercise } from 'src/app/shared/interfaces/exercises';
import { RouterModule } from '@angular/router';
import { map, take } from 'rxjs';
import { ConstService } from 'src/app/shared/services/const.service';

@Component({
  selector: 'app-exercise-preview',
  standalone: true,
  imports: [RouterModule,AgGridAngular, GridLoadingOverlayComponent],
  templateUrl: './exercise-preview.component.html',
  styleUrl: './exercise-preview.component.css',
  encapsulation: ViewEncapsulation.None
})

export class ExercisePreviewComponent {
    constService = inject(ConstService);
    exerciseService = inject(ExerciseService);
    authService = inject(AuthService);
    exercises: IExercise[] = [];

    defaultColDef = this.constService.defaultColDef;

    colDefs: ColDef[] = [
        { field: 'author.name', headerName: 'Author', flex: 1 },
        { field: 'type', headerName: 'Languange', flex: 1 },
        { field: 'category.chapter', headerName: 'Chapter'},
        { field: 'difficulty', headerName: 'Difficulty', flex: 1 },
        { field: 'actionCell', headerName: 'Actions', cellRenderer: ActionIconsComponent,  filter: false, sortable: false, floatingFilter:false, flex: 1, resizable: false},
    ];
    autoSizeStrategy = this.constService.autoSizeStrategy;
    
    loadingOverlayComponent = GridLoadingOverlayComponent;
    loadingOverlayComponentParams = { loadingMessage: 'Exercise loading...' };

    gridApi: GridApi<IExercise>;

    pyCourse: boolean;
    jsCourse: boolean;
    course: string;

    constructor() {
        this.pyCourse = true? this.authService.isCourseInstructor('python'): false;
        this.jsCourse = true? this.authService.isCourseInstructor('javascript'): false;
        
        if (this.pyCourse && this.jsCourse) {
            this.course = "all"
        } else if (this.pyCourse) {
            this.course = "python"
        } else {
            this.course = "javascript"
        }
    }

    onGridReady(params: GridReadyEvent<IExercise>): void {
        this.gridApi = params.api;
        this.gridApi.showLoadingOverlay();
        this.exerciseService
            .getExercises(this.course)
            .pipe(
                take(1),
            )
            .subscribe((data) => {
                this.gridApi.hideOverlay();
                this.exercises = data;
            });
    }
}
