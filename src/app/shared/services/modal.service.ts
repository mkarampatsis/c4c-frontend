import { Injectable, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { 
    ExerciseDetailsComponent, 
    ExerciseDetailsLearnerComponent,
    ExerciseRateComponent, 
    ExerciseRateYesNoComponent,
    ExerciseDescriptionComponent,
    ExerciseIntroductionComponent,
    ExerciseTheoryExamplesComponent,
    ExerciseDificcultyComponent,
    ExerciseHintsComponent,
    ExerciseLoadComponent,
    ExersiceSubmitComponent,
    BackendErrorComponent 
} from 'src/app/shared/modals'
import { IExercise } from 'src/app/shared/interfaces/exercises';
import { ExerciseService } from './exercise.services';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    modalService = inject(NgbModal);
    exerciseService = inject(ExerciseService)
    authservice = inject(AuthService)


    /***************************/
    /** Modal for Learners ***/ 
    /***************************/

    showExerciseDetailLearner(exercise: IExercise) {
        const modalRef = this.modalService.open(ExerciseDetailsLearnerComponent, {
            size: 'xl',
            centered: true,
            windowClass: 'bg-custom-gray-900 mat-typography'
        });
        modalRef.componentInstance.exercise = exercise;
        modalRef.componentInstance.modalRef = modalRef;
    }

    showExerciseRateLearner(exercise: object) {
        const modalRef = this.modalService.open(ExerciseRateYesNoComponent, {
            size: 'xl',
            centered: true
        });
        modalRef.componentInstance.exercise = exercise;
        modalRef.componentInstance.modalRef = modalRef;
        modalRef.result.then(
            result => { 
                this.exerciseService.setTrainingExerciseRate(result)
                .subscribe((result) => {
                    this.exerciseService.trainingExercises.set(result)
                })
            }
        )
    }

    /***************************/
    /** Modal for Instructor ***/ 
    /***************************/
    showExerciseDetails(exercise: IExercise) {
        const modalRef = this.modalService.open(ExerciseDetailsComponent, {
            size: 'xl',
            centered: true
        });
        modalRef.componentInstance.exercise = exercise;
        modalRef.componentInstance.modalRef = modalRef;
    }

    showExerciseRateInstructor(exercise: IExercise) {
        const data = {
            exercise: exercise
        }
        const modalRef = this.modalService.open(ExerciseRateComponent, {
            size: 'xl',
            centered: true,
        });
        modalRef.componentInstance.exercise = data;
        modalRef.componentInstance.modalRef = modalRef;
        modalRef.result.then(
            result => {
                const data = {
                    email:this.authservice.user().email,
                    category: "instructor",
                    course: result.exercise.type,
                    level: "none",
                    answer: "",
                    output: "",
                    exercise: result.exercise,
                    user: this.authservice.user(),
                    rate: result.rate
                }
                this.exerciseService.getTrainingExercisesByUserCategoryCourse(this.authservice.user().email, "instructor",result.exercise.type)
                .subscribe((exercises)=>{
                    const found = exercises.filter((item) => 
                        item.exercise.exercise === result.exercise.exercise
                    )
                    if (found.length > 0) {
                        console.log("found>>",data)
                        this.exerciseService.patchUsersTraining(data)
                            .subscribe((result) =>{
                                console.log(result);
                            })
                    } else {
                        this.exerciseService.postUsersTraining(data)
                            .subscribe((result) =>{
                                console.log(result);
                            })
                    }
                })
                // this.exerciseService.setTrainingExerciseRate(result)
                // .subscribe((result) => {
                //     this.exerciseService.trainingExercises.set(result)
                // })
            }
        )
    }

    /***************************/
    /*Modal for Authoring Tool*/ 
    /***************************/

    addExerciseDescription(description:string) {
        const modalRef = this.modalService.open(ExerciseDescriptionComponent, {
            size: 'xl',
            centered: true,
        });
        modalRef.componentInstance.description = description;
        modalRef.componentInstance.modalRef = modalRef;
        modalRef.result.then(
            result => { 
                result = {
                    exercise_description: [result]
                } 
                this.exerciseService.exercise$.set({...this.exerciseService.exercise$(), ...result})
            }
        )
    }

    addExerciseIntroduction(introduction: string) {
        const modalRef = this.modalService.open(ExerciseIntroductionComponent, {
            size: 'xl',
            centered: true,
        });
        modalRef.componentInstance.introduction = introduction;
        modalRef.componentInstance.modalRef = modalRef;
        modalRef.result.then(
            result => { 
                result = {
                    introduction: [result],
                } 
                this.exerciseService.exercise$.set({...this.exerciseService.exercise$(), ...result})
            }
        )
    }

    addExerciseTheory(subintroduction: string) {
        const modalRef = this.modalService.open(ExerciseTheoryExamplesComponent, {
            size: 'xl',
            centered: true,
        });
        modalRef.componentInstance.subintroduction = subintroduction;
        modalRef.componentInstance.modalRef = modalRef;
        modalRef.result.then(
            result => { 
                result = {
                    subintroduction: [result],
                } 
                this.exerciseService.exercise$.set({...this.exerciseService.exercise$(), ...result})
            }
        )
    }

    addExerciseDifficulty(difficulty: string) {
        const modalRef = this.modalService.open(ExerciseDificcultyComponent, {
            size: 'xl',
            centered: true,
        });
        modalRef.componentInstance.difficulty = difficulty;
        modalRef.componentInstance.modalRef = modalRef;
        modalRef.result.then(
            result => { 
                result = {
                    difficulty: result,
                } 
                this.exerciseService.exercise$.set({...this.exerciseService.exercise$(), ...result})
            }
        )
    }

    addExerciseHints(hints: object) {
        const modalRef = this.modalService.open(ExerciseHintsComponent, {
            size: 'xl',
            centered: true,
        });
        modalRef.componentInstance.data = hints;
        modalRef.componentInstance.modalRef = modalRef;
        modalRef.result.then(
            result => { 
                this.exerciseService.exercise$.set({...this.exerciseService.exercise$(), ...result})
            }
        )
    }

    loadExercisesByUserAndCourse(course:string) {
        const modalRef = this.modalService.open(ExerciseLoadComponent, {
            size: 'xl',
            centered: true,
        });
        modalRef.componentInstance.course = course;
        modalRef.componentInstance.modalRef = modalRef;
        modalRef.result.then(
            result => { 
                this.exerciseService.exercise$.set(result)
            }
        )
    }

    showSubmitDetails(exercise: IExercise) {
        const modalRef = this.modalService.open(ExersiceSubmitComponent, {
            size: 'xl',
            centered: true
        });
        modalRef.componentInstance.exercise = exercise;
        modalRef.componentInstance.modalRef = modalRef;
        modalRef.result.then(
            result => { 
                console.log("Submit", result)
                this.exerciseService.isApproved$.set(true);
                this.exerciseService.exercise$.set(result)

            }
        )
    }


    /***************************/
    /*Modal for General Purposes*/ 
    /***************************/
    showBackendError(message: string) {
        const modalRef = this.modalService.open(BackendErrorComponent, {
            size: 'md',
            centered: true,
        });
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.modalRef = modalRef;
    }
}
