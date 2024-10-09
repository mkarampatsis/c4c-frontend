import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { LandingNavigationComponent } from 'src/app/shared/components/landing-navigation/landing-navigation.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { UserNavigationComponent } from 'src/app/shared/components/user-navigation/user-navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LandingNavigationComponent,
    UserNavigationComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
    authService = inject(AuthService);
    user = this.authService.user;
    router = inject(Router);
    
    uri!: string | '';
    event$: any;

    routesWithouLoggedIn = ["/home", "/about", "/c4c"]

    constructor(){
        this.event$ = this.router.events
        .subscribe(
        ( event: NavigationEvent ) => {
            if ( event instanceof NavigationStart ) {
                // console.log("URL>>",event.url)
                this.uri = event.url;
            }
        });
    }
    
    ngOnDestroy() {
        this.event$.unsubscribe();
    }

}

 
