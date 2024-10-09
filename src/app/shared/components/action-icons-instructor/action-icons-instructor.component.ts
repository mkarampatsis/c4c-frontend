import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-action-icons-instructor',
  standalone: true,
  imports: [],
  templateUrl: './action-icons-instructor.component.html',
  styleUrl: './action-icons-instructor.component.css'
})
export class ActionIconsInstructorComponent {

}
