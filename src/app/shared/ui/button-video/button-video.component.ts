import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-button-video',
  standalone: true,
  imports: [],
  templateUrl: './button-video.component.html',
  styleUrl: './button-video.component.css',
})
export class ButtonVideoComponent implements AfterViewInit {
  @ViewChild('button') button!: ElementRef;
  @Input()
  text = 'Try the demo';

  ngAfterViewInit() {
    this.button.nativeElement.click();
  }
}
