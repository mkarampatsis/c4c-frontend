import { Component, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule} from '@angular/common';
import { ProseComponent } from '../../components/prose/prose.component';

@Component({
  selector: 'app-exercise-intro-theory',
  standalone: true,
  imports: [CommonModule, NgbModalModule, ProseComponent],
  templateUrl: './exercise-introduction.component.html',
  styleUrl: './exercise-introduction.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ExerciseIntroductionComponent {
    @ViewChild(ProseComponent) proseComponent: ProseComponent  

    introduction: string;
    modalRef: any;

    ngAfterViewInit() {
        this.proseComponent.setEditorContent(this.introduction)
    }

    submit(){
        this.modalRef.close(this.proseComponent.doc.value);
    }
}
