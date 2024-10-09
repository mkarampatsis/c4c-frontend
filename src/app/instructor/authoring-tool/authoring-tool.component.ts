import { CommonModule } from '@angular/common';
import { Component, effect, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from 'src/app/shared/components/editor/editor.component';
import { TerminalComponent } from 'src/app/shared/components/terminal/terminal.component';

import { HintComponent } from 'src/app/shared/components/hint/hint.component';
import { ExerciseService } from 'src/app/shared/services/exercise.services';
import { IExercise } from 'src/app/shared/interfaces/exercises';
import { ModalService } from 'src/app/shared/services/modal.service';
import { take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import 'short-uuid'
import shortUUID from 'short-uuid';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Toast, ToastService } from 'src/app/shared/services/toast.service';
import { ToastMessageComponent } from 'src/app/shared/components/toast-message/toast-message.component';

declare let loadPyodide: any;

@Component({
  selector: 'app-authoring-tool',
  standalone: true,
  imports: [
        CommonModule,
        ReactiveFormsModule,
        EditorComponent,
        TerminalComponent,
        HintComponent,
        NgbNavModule
  ],
  templateUrl: './authoring-tool.component.html',
  styleUrl: './authoring-tool.component.css',
})
export class AuthoringToolComponent {
    
    @ViewChild('successTpl') successTpl: TemplateRef<any>;
    
    modalService = inject(ModalService);
    exerciseService = inject(ExerciseService)
    authService = inject(AuthService);
    toastService = inject(ToastService);
    route = inject(ActivatedRoute);

    exercise: IExercise;

    output: string = '';

    course: string | undefined;
    introduction: boolean = false;
    theory: boolean = false;
    hint: boolean = false
    description: boolean = false;
    difficulty: boolean = false;
    code: boolean = false;
    category: boolean = false;

    checkData: boolean = true;
    isNewExercise: boolean = true;
    changeSubmitButton: string = "Submit"

    form = new FormGroup({
        code: new FormControl(''),
    });


    constructor(){
        this.initExercise();
        this.exercise = this.exerciseService.exercise$()
        this.addToOutput("Ready!<br>"); 
        
        effect(() => {
            if (this.exerciseService.exercise$()){
                this.exercise = this.exerciseService.exercise$()
            }

            this.introduction = true? this.exerciseService.exercise$().introduction.length>0: false;
            this.theory = true? this.exerciseService.exercise$().subintroduction.length>0 : false;
            this.hint = true? this.exerciseService.exercise$().hints.length>0 : false;
            this.description = true? this.exerciseService.exercise$().exercise_description.length>0 : false;
            this.difficulty = true? this.exerciseService.exercise$().difficulty.trim().length != 0: false;
            this.code = true? this.exerciseService.exercise$().code.trim().length!=0 && this.exerciseService.exercise$().output.length>0: false;
            this.category = true? this.exerciseService.exercise$().category.chapter.trim().length!=0: false

            
            if (this.category && this.hint && this.description && this.difficulty && this.code) {
                this.checkData = false
            } else {
                this.checkData = true
            }

            if (this.code) {
                this.form.controls['code'].setValue(this.exerciseService.exercise$().code);
            }
            // this.checkData = false? this.description && this.difficulty && this.code: true;

            if (this.exerciseService.isApproved$) {
                if (!this.checkData){
                    if (this.isNewExercise ){
                        this.changeSubmitButton = "Save"
                    } else {
                        this.changeSubmitButton = "Update"
                    }
                }
            }
        });
    }

    showExerciseDetails() {
        this.modalService.showExerciseDetails(this.exercise);
    }

    addDescription() {
        this.modalService.addExerciseDescription(this.exerciseService.exercise$().exercise_description[0]);
    }

    addIntroduction() {
        this.modalService.addExerciseIntroduction(this.exerciseService.exercise$().introduction[0]);
    }

    addTheory() {
        this.modalService.addExerciseTheory(this.exerciseService.exercise$().subintroduction[0]);
    }

    addDifficulty() {
        this.modalService.addExerciseDifficulty(this.exerciseService.exercise$().difficulty);
    }

    addHint() {
        this.modalService.addExerciseHints(this.exerciseService.exercise$().hints);
    }

    async runCode(){
        let code = this.form.controls.code.value.toString();
        
        if (this.course==="javascript") {
            if (typeof Worker !== 'undefined') {
                const worker = new Worker(new URL('../../shared/workers/javascript.worker', import.meta.url));
                worker.onmessage = ({ data }) => {
                    if (data.status) {
                        // set result to exircise$
                        const result = {
                            code: code,
                            output: data.result
                        } 
                        this.exerciseService.exercise$.set({...this.exerciseService.exercise$(), ...result})
                    }
                    
                    this.addToOutput(data.result);
                };
                worker.postMessage(code);
            } else {
                console.log("Web workers are not supported in this environment.")
            }
        } else {
            let pyodide = await loadPyodide() 
           
            try {
                pyodide.setStdout({ batched: (msg: string) => {
                    this.addToOutput(msg); 
                    // set result to exircise$
                    const result = {
                        code: code,
                        output: [msg]
                    } 
                    this.exerciseService.exercise$.set({...this.exerciseService.exercise$(), ...result})
                }
                });
                try {
                    pyodide.runPython(code)
                } catch(err) {
                    this.addToOutput(err); 
                }
            }  catch (err) {
            this.addToOutput(err);
        }
        }
    }
  
    nextExercise(){
        this.exerciseService
        .getLearnerExercise('python', this.authService.user().email)
        .pipe(take(1))
        .subscribe((data) => {
            this.exercise = data[0]
            this.form.controls['code'].setValue(this.exercise.code)
            this.output = ''
            this.addToOutput("Ready!<br>"); 
        })
    }

    loadExercises(){
        this.modalService.loadExercisesByUserAndCourse(this.course)
        this.isNewExercise = false;
    }

    addToOutput(msg: string) {
        this.output += ">>> " + msg + "<br>";
    }

    showSuccess(template: TemplateRef<any>) {
        const toast: Toast = {
            component: ToastMessageComponent,
            inputs: {
                message: `Επιτυχής εισαγωγή νέας Νομικής Πράξης <strong>${this.exerciseService.exercise$().exercise}</strong>.`,
            },
            classname: 'bg-success text-light',
        };
        this.toastService.show(toast);
    }

    onSubmit() {
        this.modalService.showSubmitDetails(this.exerciseService.exercise$())
    }

    saveExercise(){
        this.exerciseService.postUsersExercise(this.exerciseService.exercise$())
        .subscribe((result)=>{
            this.initExercise();
            // this.showSuccess(this.successTpl);
        })
    }

    updateExercise(){
         this.exerciseService.patchUsersExercise(this.exerciseService.exercise$())
        .subscribe((result)=>{
            this.initExercise();
            // this.showSuccess(this.successTpl);
        })
    }

    initExercise(){
        const uuid = shortUUID()

        this.course = this.route.snapshot.params['course'];
        this.exerciseService.isApproved$.set(false);
        
        this.exerciseService.exercise$.set({
            introduction: [],
            subintroduction: [],
            exercise_description: [],
            category: {
                chapter: "",
                subchapter: []
            },
            hints: [],
            author: {
                name: this.authService.user().name,
                email: this.authService.user().email
            },
            type: this.course,
            code: "",
            output: [],
            exercise: uuid.generate(),
            difficulty: ""
        })
        this.changeSubmitButton = "Submit"
        this.form.controls['code'].setValue('')
        this.output = ''
    }

   
}
