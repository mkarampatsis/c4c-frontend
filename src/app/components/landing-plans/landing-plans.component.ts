import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-plans',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-plans.component.html',
  styleUrl: './landing-plans.component.css'
})
export class LandingPlansComponent {
}
