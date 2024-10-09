import { Component, ViewEncapsulation, inject, OnInit } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule} from '@angular/common';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { IHint } from '../../interfaces/exercises';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exercise-hints',
  standalone: true,
  imports: [CommonModule, NgbModalModule,ReactiveFormsModule, MatIconModule],
  templateUrl: './exercise-hints.component.html',
  styleUrl: './exercise-hints.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ExerciseHintsComponent implements OnInit {
    formBuilder = inject(FormBuilder);

    data: [IHint];
    modalRef: any;

    form : FormGroup;

    ngOnInit(){
        if (this.data.length>0) {
            this.form = this.formBuilder.group({
                hints: this.formBuilder.array([])
            });
            this.data.forEach((hint)=> {
                this.hint.push(
                    this.formBuilder.group({
                        text: hint.text, 
                        code: hint.code,
                        penalty: hint.penalty 
                    })
                )
            })
        } else {
            this.form = this.formBuilder.group({
                hints: this.formBuilder.array([this.initHint()])
            });
        }
    }
   
    get hint() {
        return this.form.get("hints") as FormArray;
    }

    initHint() {
        return this.formBuilder.group({
            text: [""],
            code: [""],
            penalty: ["20"]
        });
    }

    addRow() {
        this.hint.push(this.initHint());
    }

    deleteRow(index: number) {
        this.hint.removeAt(index);
    }

    submit(){
        this.modalRef.close(this.form.value);
    }
}
