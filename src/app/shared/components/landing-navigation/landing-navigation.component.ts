import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ButtonVideoComponent } from 'src/app/shared/ui';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    GoogleSigninButtonModule,
    ButtonVideoComponent,
  ],
  templateUrl: './landing-navigation.component.html',
  styleUrl: './landing-navigation.component.css',
})
export class LandingNavigationComponent implements AfterViewInit {
  authService = inject(AuthService);
  user = this.authService.user;

  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  mobileMenuRef!: ElementRef;
  renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    this.mobileMenuRef = this.mobileMenu.nativeElement;
  }

  onBurgerClick() {
    this.renderer.removeClass(this.mobileMenuRef, 'hidden');
  }

  onBurgerIconCloseClick() {
    this.renderer.addClass(this.mobileMenuRef, 'hidden');
  }
}
