import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-tile-video',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tile-video.component.html',
  styleUrl: './tile-video.component.css',
})
export class TileVideoComponent {
  @Input() link = '';
  @Input() videoURL = '';
  @Input() heading = '';
  @Input() paragraph = '';
  @Input() borderColor = 'green';
}
