import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    ViewChild,
    forwardRef,
    inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { EditorState, Extension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';

@Component({
    selector: 'app-javascript-editor',
    standalone: true,
    imports: [],
    templateUrl: './javascript.editor.component.html',
    styleUrl: './javascript.editor.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JavascriptEditorComponent),
            multi: true,
        },
    ],
})

export class JavascriptEditorComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {
    @Input() codeType: string = 'javascript';
    @ViewChild('editor') editorDIV: ElementRef;
    
    editor: EditorView;
    state: EditorState;
    extensions: Extension[];

    cdr = inject(ChangeDetectorRef);

    private initialValue: string;
    private onChange: (value: string) => void;
    private onTouched: () => void;

    ngAfterViewInit(): void {

        setTimeout(() => {
            const editorElement = this.editorDIV.nativeElement;
            const extensions = [
                basicSetup,
                indentationMarkers(),
                keymap.of([indentWithTab]),
                this.codeType === 'javascript' ? javascript() : python(),
                EditorView.lineWrapping,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        this.onChange(update.state.doc.toString());
                        this.onTouched();
                    }
                }),
                dracula,
            ];

            this.editor = new EditorView({
                state: EditorState.create({
                    doc: '',
                    extensions,
                }),
                parent: editorElement,
            });

            if (this.initialValue) {
                this.writeValue(this.initialValue);
                this.initialValue = null;
            }
        }, 0);
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }

    writeValue(value: string): void {
        if (this.editor) {
            this.editor.dispatch({
                changes: {
                    from: 0,
                    to: this.editor.state.doc.length,
                    insert: value,
                },
            });
        } else {
            this.initialValue = value;
        }
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}
