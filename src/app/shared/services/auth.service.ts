import { Injectable, inject, signal } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IProfileUpdateRequest } from '../interfaces/profileUpdateRequest.interface';
import { IUser, IUserEvaluation } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    socialAuthService = inject(SocialAuthService);
    http = inject(HttpClient);
    router = inject(Router);

    user = signal(<IUser | null>null);

    constructor() {
        this.socialAuthService.authState.subscribe((user: SocialUser) => {
            if (user) {
                const { idToken } = user;
                this.http
                    .post<{
                        accessToken: string;
                    }>(`${environment.apiURL}/auth/google-auth`, { idToken })
                    .subscribe({
                        next: (response) => {
                            const { accessToken } = response;
                            localStorage.setItem('accessToken', accessToken);

                            this.http
                                .get<IUser>(`${environment.apiURL}/auth/user`)
                                .subscribe({
                                    next: (user) => {
                                        this.user.set(user);
                                        if (this.user().isEnabled) {
                                            this.router.navigate([
                                                'c4c',
                                                'dashboard',
                                            ]);
                                        } else {
                                            this.router.navigate([
                                                'c4c',
                                                'register',
                                            ]);
                                        }
                                    },
                                    error: (error) => {
                                        console.error(error);
                                    },
                                });
                        },
                        error: (error) => {
                            console.error(error);
                        },
                    });
            }
        });
    }

    signOut() {
        this.socialAuthService.signOut();
        this.user.set(null);
        localStorage.removeItem('accessToken');
        this.router.navigate(['c4c']);
    }

    updateProfile(req: IProfileUpdateRequest) {
        return this.http.patch<{ user: IUser; msg: string }>(
            `${environment.apiURL}/auth/profile`, req);
    }

    isCourseLearner(course:string) {
        const result = this.user().roles
            .filter((data) => {
                    return data.course === course && data.category === 'learner'  && data.isEnabled 
            })

        return result.length > 0;
    }

    isCourseInstructor(course:string) {
        const result = this.user().roles
            .filter((data) => {
                    return data.course === course && data.category === 'instructor'  && data.isEnabled 
            })
        return result.length > 0;
    }

    isLearner() {
        const result = this.user().roles
        .filter((data) => {
                return data.category === 'learner' && data.isEnabled
        })
        
        return result.length > 0;
    }

    isInstructor() {
        const result = this.user().roles
        .filter((data) => {
                return data.category === 'instructor' && data.isEnabled
        })
        
        return result.length > 0;
    }

    isAdministrator() {
        const result = this.user().roles
        .filter((data) => {
                return data.category === 'administrator' && data.isEnabled
        })
        
        return result.length > 0;
    }

    isLearnerOrInstructorOrNothing() {
        if (this.isLearner() || this.isInstructor()) {
            this.router.navigate(['c4c', 'dashboard']);
        } else {
            this.router.navigate(['c4c', 'enroll']);
        }
    }

}
