import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ModalService } from 'src/app/shared/services/modal.service';
// import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-foreis-action-icons',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './action-icons.component.html',
    styleUrl: './action-icons.component.css',
})
export class ActionIconsComponent implements ICellRendererAngularComp {
    // authService = inject(AuthService);
    modalService = inject(ModalService);
    params: ICellRendererParams;

    agInit(params: ICellRendererParams<any, any, any>): void {
        this.params = params;
    }

    refresh(params: ICellRendererParams<any, any, any>): boolean {
        return false;
    }

    showExerciseDetails(): void {
        this.modalService.showExerciseDetails(this.params.data);
    }

    instructorRateForm(): void {
        this.modalService.showExerciseRateInstructor(this.params.data);
    }

}
