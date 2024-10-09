import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-tile-text',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tile-text.component.html',
  styleUrl: './tile-text.component.css',
})
export class TileTextComponent {
  @Input() link = '';
  @Input() heading = '';
  @Input() paragraph = '';
}
