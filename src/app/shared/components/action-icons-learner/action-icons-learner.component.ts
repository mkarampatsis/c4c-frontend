import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-action-icons-learner',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './action-icons-learner.component.html',
  styleUrl: './action-icons-learner.component.css'
})
export class ActionIconsLearnerComponent {
    modalService = inject(ModalService);
    params: ICellRendererParams;

    agInit(params: ICellRendererParams<any, any, any>): void {
        this.params = params;
    }

    refresh(params: ICellRendererParams<any, any, any>): boolean {
        return false;
    }

    showExerciseDetailLearner(): void {
        this.modalService.showExerciseDetailLearner(this.params.data.exercise);
    }

    createEvaluation(): void {
        this.modalService.showExerciseRateLearner(this.params.data.exercise);
    }
}
