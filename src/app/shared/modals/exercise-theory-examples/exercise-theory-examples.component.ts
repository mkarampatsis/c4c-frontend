import { Component, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule} from '@angular/common';
import { ProseComponent } from '../../components/prose/prose.component';

@Component({
  selector: 'app-exercise-theory-examples',
  standalone: true,
  imports: [CommonModule, NgbModalModule, ProseComponent],
  templateUrl: './exercise-theory-examples.component.html',
  styleUrl: './exercise-theory-examples.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ExerciseTheoryExamplesComponent {
    @ViewChild(ProseComponent) proseComponent: ProseComponent  

    subintroduction: string;
    modalRef: any;

    ngAfterViewInit() {
        this.proseComponent.setEditorContent(this.subintroduction)
    }

    submit(){
        this.modalRef.close(this.proseComponent.doc.value);
    }
}
