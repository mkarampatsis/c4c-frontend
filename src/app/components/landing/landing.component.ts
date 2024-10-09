import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonVideoComponent } from 'src/app/shared/ui';
import { TileVideoComponent } from 'src/app/shared/ui/tile-video/tile-video.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, TileVideoComponent, ButtonVideoComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}
