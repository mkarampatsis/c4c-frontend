import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { capitalize } from 'lodash-es';
import { CommonModule, NgFor } from '@angular/common';
import { ConstService } from 'src/app/shared/services/const.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserEvaluationService } from 'src/app/shared/services/evaluation.service';
import { ExerciseService } from 'src/app/shared/services/exercise.services';
import { IUserLanguageEvaluation } from 'src/app/shared/interfaces/user-evaluation'; 
import { IUserEvaluationAnswer, IUserEvaluation} from 'src/app/shared/interfaces/user'
import { MLUserEvaluation } from 'src/app/shared/interfaces/ml';
import { IProfileUpdateReply } from 'src/app/shared/interfaces/profileUpdateReply.interface'

@Component({
  selector: 'app-learner-python-evaluation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './learner-python-evaluation.component.html',
  styleUrl: './learner-python-evaluation.component.css'
})
export class LearnerPythonEvaluationComponent {
    authService = inject(AuthService);
    user$ = this.authService.user();
    name$ = this.user$.name.split(" ")[0];
    
    evaluationService = inject(UserEvaluationService)

    exerciseServise = inject(ExerciseService);
   
    constService = inject(ConstService);
    levels  = this.constService.USER_LEVEL;
  
    exercises: Array<IUserLanguageEvaluation> | undefined;

    frmEvaluation = new FormGroup({
        'level': new FormControl(''),
        'exercise1': new FormArray([], Validators.required),
        'exercise2': new FormArray([], Validators.required),
        'exercise3': new FormArray([], Validators.required),
        'exercise4': new FormArray([], Validators.required),
        'exercise5': new FormArray([], Validators.required),
        'exercise6': new FormArray([], Validators.required),
        'exercise7': new FormArray([], Validators.required),
        'exercise8': new FormArray([], Validators.required),
        'exercise9': new FormArray([], Validators.required),
        'exercise10': new FormArray([], Validators.required),
    });

    constructor(){
       this.exerciseServise.getEvaluationExercises('python')
        .subscribe({
            next: (data) => {
              this.exercises = data       
            },
            error: error => {
              console.log(error);
            }
          }) 
    }
      
    onCheckboxChange(e: any, exercise: number) {
      let checkArray = this.frmEvaluation.get("exercise"+exercise.toString()) as FormArray;
      
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: any) => {
            if (item.value == e.target.value) {
                checkArray.removeAt(i);
                return;
            }
            i++;
        });
      }
    // console.log(this.frmEvaluation.value)
    }
  
    saveAnswers(){
        const getBoolValue = (arr: any[]) => arr.map((data: string) => data.split('_')[0]).every((data: string) => data==='true')
        const getId = (arr: any[]) =>  arr.map((data: string) => data.split('_')[1]).reduce((acc: string | any[], curr: any) => acc.includes(curr) ? acc : [...acc, curr], [])
        const getGravity = (arr: any[]) => arr.map((data: string) => data.split('_')[2])
        
        let result: IUserEvaluation = {
            course: "python",
            level: this.frmEvaluation.value.level,
            date: new Date(),
            score: 0,
            answers: []
        }

        let mlResult: MLUserEvaluation = {
            student_id: this.user$.email,
            grade: 0,
            correct: 0,
            total: 10,
            perc: 0
        }

        let score: number = 0;
        let answer:IUserEvaluationAnswer = null
        let answers = []

        for (let i=1; i<=10; i++){
            let gravity = getGravity(this.frmEvaluation.value['exercise'+i])
            
            if (getBoolValue(this.frmEvaluation.value['exercise'+i]) && this.frmEvaluation.value['exercise'+i].length>0){
                score = score + parseInt(gravity[0])
                 answer = {
                    question_id: getId(this.frmEvaluation.value['exercise'+i])[0],
                    correct: true
                }
            } else {
                answer = {
                    question_id: getId(this.frmEvaluation.value['exercise'+i])[0],
                    correct: false
                }
            }

            answers.push(answer)
        }

        result.score = score;
        result.answers = answers;

        mlResult.grade = score;
        mlResult.correct = score;
        mlResult.perc = mlResult.correct/mlResult.total

        this.evaluationService
            .setUserEvaluation(result)
            .pipe(take(1))
            .subscribe({
                next: (res: IProfileUpdateReply) => {
                    this.authService.user.set(res.user);
                    this.authService.router.navigate(['c4c', 'learner', 'python']);
                },
                    error: (err) => {
                    console.log(err);
                },
        });
        //   this.router.navigate(['learner/learning-path', this.language]);
    }
  
    resetForm(){
      console.log("reset");
      this.frmEvaluation.reset();
      this.exercises = [];
    }

    capitalize(value: string) {
        return capitalize(value);
    }
}
