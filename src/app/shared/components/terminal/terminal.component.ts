import { Component, ViewChild } from '@angular/core';
import { Terminal } from '@xterm/xterm';
import { NgTerminal, NgTerminalModule, FunctionsUsingCSI } from 'ng-terminal';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { WebglAddon } from 'xterm-addon-webgl';
@Component({
    selector: 'app-terminal',
    standalone: true,
    imports: [NgTerminalModule],
    templateUrl: './terminal.component.html',
    styleUrl: './terminal.component.css',
})
export class TerminalComponent {
    @ViewChild('terminal', { static: false }) terminal: NgTerminal;
    readonly color = 'accent';
    readonly prompt = '\n' + FunctionsUsingCSI.cursorColumn(1) + '>>> ';

    baseTheme = {
        foreground: '#F8F8F8',
        background: '#292D32',
        selectionBackground: '#5DA5D533',
        black: '#1E1E1D',
        brightBlack: '#262625',
        red: '#CE5C5C',
        brightRed: '#FF7272',
        green: '#5BCC5B',
        brightGreen: '#72FF72',
        yellow: '#CCCC5B',
        brightYellow: '#FFFF72',
        blue: '#5D5DD3',
        brightBlue: '#7279FF',
        magenta: '#BC5ED1',
        brightMagenta: '#E572FF',
        cyan: '#5DA5D5',
        brightCyan: '#72F0FF',
        white: '#F8F8F8',
        brightWhite: '#FFFFFF',
        border: '#85858a',
    };

    underlying: Terminal;

    ngAfterViewInit() {
        this.underlying = this.terminal.underlying;
        this.underlying.loadAddon(new WebLinksAddon());
        this.underlying.options.cursorStyle = 'block';
        this.underlying.options.cursorBlink = true;
        this.underlying.options.fontSize = 18;
        this.underlying.options.fontFamily = 'monospace';
        this.underlying.options.theme = this.baseTheme;
        this.terminal.write(
            'Welcome to the C4C Terminal! Press Enter to activate.',
        );
        this.terminal.onData().subscribe((input) => {
            if (input === '\r') {
                // Carriage Return (When Enter is pressed)
                this.terminal.write(this.prompt);
            } else if (input === '\u007f') {
                // Delete (When Backspace is pressed)
                if (this.terminal.underlying.buffer.active.cursorX > 4) {
                    this.terminal.write('\b \b');
                }
            } else if (input === '\u0003') {
                // End of Text (When Ctrl and C are pressed)
                this.terminal.write('^C');
                this.terminal.write(this.prompt);
            } else if (input === '\u000c') {
                // Form Feed (When Ctrl and L are pressed)
                this.terminal.underlying.clear();
                // this.terminal.write(this.prompt);
            } else this.terminal.write(input);
        });
    }
}
