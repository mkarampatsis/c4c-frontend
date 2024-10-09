import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LearnerDashboardComponent } from 'src/app/learner/learner-dashboard/learner-dashboard.component';
import { InstructorDashboardComponent } from 'src/app/instructor/instructor-dashboard/instructor-dashboard.component';
import { AdministratorDashboardComponent } from 'src/app/administrator/administrator-dashboard/administrator-dashboard.component';
import { ConstService } from 'src/app/shared/services/const.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        LearnerDashboardComponent,
        InstructorDashboardComponent,
        AdministratorDashboardComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
    authService = inject(AuthService);
    constService = inject(ConstService);
}