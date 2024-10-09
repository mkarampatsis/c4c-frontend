import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConstService } from 'src/app/shared/services/const.service';
import { SubmitButtonComponent } from 'src/app/shared/ui/submit-button/submit-button.component';

import { capitalize } from 'lodash-es';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SubmitButtonComponent],
  templateUrl: './landing-register.component.html',
  styleUrl: './landing-register.component.css',
})
export class LandingRegisterComponent {
  authService = inject(AuthService);
  constService = inject(ConstService);
  router = inject(Router);

  categories = this.constService.USER_CATEGORIES;

  user$ = this.authService.user();
  name$ = this.user$.name;
  firstName$ = this.user$.firstName;
  photoUrl$ = this.user$.photoUrl;
  email$ = this.user$.email;

  form = new FormGroup({
    email: new FormControl(
      { value: this.email$, disabled: true },
      Validators.required,
    ),
    name: new FormControl(
      { value: this.name$, disabled: true },
      Validators.required,
    ),
    // category: new FormControl('', Validators.required),
  });

  onImageError(event: any) {
    event.target.src = '/assets/icons/user-account.svg';
  }

  capitalize(value: string) {
    return capitalize(value);
  }

  onSubmit() {
    // this.router.navigate(['c4c/enroll', this.form.value.category]);
    this.router.navigateByUrl('c4c/enroll');
  }
}
