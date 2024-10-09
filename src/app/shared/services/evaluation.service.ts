import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser, IUserEvaluation } from '../interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
    providedIn: 'root',
})

export class UserEvaluationService {
    authService = inject(AuthService);
    user = this.authService;
    
    http = inject(HttpClient);
    router = inject(Router);
    
    setUserEvaluation(req: IUserEvaluation) {
        return this.http.patch<{ user: IUser; msg: string }>(
            `${environment.apiURL}/evaluation/user_evaluation`,req,);
    }

    courseEvalution(course:string){
        const evaluation = this.authService.user()
            .evaluations.filter((data) => {
                    return data.course === course
            })
        return evaluation.length > 0;
    }
}