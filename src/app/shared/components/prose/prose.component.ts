import { Component, InjectionToken, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { Editor, Toolbar, Validators, NgxEditorModule } from 'ngx-editor';

@Component({
    selector: 'app-prose',
    standalone: true,
    imports: [ReactiveFormsModule, NgxEditorModule],
    templateUrl: './prose.component.html',
    styleUrl: './prose.component.css',
    encapsulation: ViewEncapsulation.None,
})


export class ProseComponent implements OnInit, OnDestroy {
    editor: Editor;
    toolbar: Toolbar = [
        ['bold', 'italic', 'underline', 'strike', 'code'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];
    form = new FormGroup({
        editorContent: new FormControl(
            { value: '', disabled: false },
            Validators.required(),
        ),
    });

    get doc(): AbstractControl {
        return this.form.get('editorContent');
    }

    setEditorContent(data: string) {
        this.form.controls.editorContent.setValue(data);
    }

    ngOnInit(): void {
        this.editor = new Editor();
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }
}
