import { Component } from '@angular/core';
import { ButtonVideoComponent } from 'src/app/shared/ui';

@Component({
  selector: 'app-landing-authoring-tool',
  standalone: true,
  imports: [ButtonVideoComponent],
  templateUrl: './landing-authoring-tool.component.html',
  styleUrl: './landing-authoring-tool.component.css',
})
export class LandingAuthoringToolComponent {}
