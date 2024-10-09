import { Component } from '@angular/core';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-landing-login',
  standalone: true,
  imports: [GoogleSigninButtonModule],
  templateUrl: './landing-login.component.html',
  styleUrl: './landing-login.component.css'
})
export class LandingLoginComponent {

}
