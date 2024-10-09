import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IExercise, IUserTraining } from "src/app/shared/interfaces/exercises";
import { IUserLanguageEvaluation } from 'src/app/shared/interfaces/user-evaluation';
import { IUserAssessment } from 'src/app/shared/interfaces/user'

@Injectable({
    providedIn: 'root',
  })
  export class ExerciseService {
    http = inject(HttpClient);
  
    trainingExercises = signal(<IUserTraining | null>null);
    exercise$ = signal(<IExercise>null);
    isApproved$ = signal(false)
    
    getExercise(code: string): Observable<IExercise> {
        const url = `${environment.apiURL}/exercises/one/${code}`;
        return this.http.get<IExercise>(url);
    }

    getExercises(course: string): Observable<IExercise[]> {
        const url = `${environment.apiURL}/exercises/all/${course}`;
        return this.http.get<IExercise[]>(url);
    }

    getExercisesByUserAndCourse(email: string, course: string): Observable<IExercise[]> {
        const url = `${environment.apiURL}/exercises/all/user/${email}/${course}`;
        return this.http.get<IExercise[]>(url);
    }

    getEvaluationExercises(course: string): Observable<IUserLanguageEvaluation[]> {
        const url = `${environment.apiURL}/evaluation/questions/${course}`;
        return this.http.get<IUserLanguageEvaluation[]>(url);
    }

    postUserAssement(data: Object): Observable<IUserAssessment> {
        const url = `${environment.apiURL}/ml/user_assesment`;
        return this.http.post<IUserAssessment>(url, data);
    }

    getLearnerExercise(course: string, email: string): Observable<IExercise> {
        const url = `${environment.apiURL}/exercises/course/${email}/${course}`;
        return this.http.get<IExercise>(url);
    }

    getLearnerNextExercise(course: string, difficulty:string, chapter: string): Observable<IExercise> {
        const url = `${environment.apiURL}/exercises/course/next/${course}/${difficulty}/${chapter}`;
        return this.http.get<IExercise>(url);
    }

    getCourseChapters(course:string): Observable<string[]> {
        const url = `${environment.apiURL}/exercises/chapters/${course}`;
        return this.http.get<string[]>(url);
    }

    postUsersExercise(data:IExercise): Observable<IExercise> {
        const url = `${environment.apiURL}/exercises/exercise`;
        return this.http.post<IExercise>(url, data);
    }

    patchUsersExercise(data:IExercise): Observable<IExercise> {
        const url = `${environment.apiURL}/exercises/exercise`;
        return this.http.patch<IExercise>(url, data);
    }

   
   
    // *************************************
    // **** Training Exercises Requests ****
    // *************************************

    getTrainingExercisesByUserCategoryCourse(user:string, category:string, course:string):Observable<IUserTraining[]> {
        const url = `${environment.apiURL}/exercises/training/count/${user}/${category}/${course}`;
        return this.http.get<IUserTraining[]>(url);
    }
    
    postUsersTraining(data:any): Observable<IUserTraining> {
        const url = `${environment.apiURL}/exercises/training`;
        return this.http.post<IUserTraining>(url, data);
    }

    patchUsersTraining(data:any): Observable<IUserTraining> {
        const url = `${environment.apiURL}/exercises/training`;
        return this.http.patch<IUserTraining>(url, data);
    }


    getUsersTrainingExercises(email:string): Observable<IUserTraining[]> {
        const url = `${environment.apiURL}/exercises/training/${email}`;
        return this.http.get<IUserTraining[]>(url);
    }

    setTrainingExerciseRate(data:any): Observable<IUserTraining> {
        const url = `${environment.apiURL}/exercises/training/rate`;
        return this.http.patch<IUserTraining>(url, data);
    }

    // *****************************
    // ******** ML Requests ********
    // *****************************

    getExerciseCategorization(data:object): Observable<object> {
        const url = `${environment.apiURL}/ml/exercise/category`;
        return this.http.post<object>(url, data);
    }
}