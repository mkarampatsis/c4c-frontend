import { Component, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule} from '@angular/common';
import { ProseComponent } from '../../components/prose/prose.component';

@Component({
  selector: 'app-exercise-description',
  standalone: true,
  imports: [CommonModule, NgbModalModule, ProseComponent],
  templateUrl: './exercise-description.component.html',
  styleUrl: './exercise-description.component.css',
  encapsulation: ViewEncapsulation.None
})

export class ExerciseDescriptionComponent implements AfterViewInit{
    @ViewChild(ProseComponent) proseComponent: ProseComponent  

    description: string;
    modalRef: any;

    ngAfterViewInit() {
        this.proseComponent.setEditorContent(this.description)
    }

    submit(){
        this.modalRef.close(this.proseComponent.doc.value);
    }
}
