import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-navigation',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './user-navigation.component.html',
  styleUrl: './user-navigation.component.css',
})
export class UserNavigationComponent {
  authService = inject(AuthService);
  user = this.authService.user;

  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  mobileMenuRef!: ElementRef;
  renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    this.mobileMenuRef = this.mobileMenu.nativeElement;
  }

  onBurgerClick() {
    console.log('burger clicked');
    this.renderer.removeClass(this.mobileMenuRef, 'hidden');
  }

  onBurgerIconCloseClick() {
    this.renderer.addClass(this.mobileMenuRef, 'hidden');
  }

  logout() {
    this.authService.signOut();
  }

  onImageError(event: any) {
    event.target.src = '/assets/icons/user-account.svg';
  }
}
