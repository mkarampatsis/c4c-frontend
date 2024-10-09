import { CommonModule } from '@angular/common';
import { Component, inject,  OnInit, } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
  } from '@angular/forms';
import { ConstService } from 'src/app/shared/services/const.service';
import { SubmitButtonComponent } from 'src/app/shared/ui/submit-button/submit-button.component';
import { IProfileUpdateRequest } from 'src/app/shared/interfaces/profileUpdateRequest.interface';
import { take } from 'rxjs';
import { IProfileUpdateReply } from 'src/app/shared/interfaces/profileUpdateReply.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SubmitButtonComponent],
  templateUrl: './payform.component.html',
  styleUrl: './payform.component.css'
})
export class PayformComponent implements OnInit {
    authService = inject(AuthService);
    constService = inject(ConstService);
    router = inject(Router);
    route = inject(ActivatedRoute);

    categories = this.constService.PAY_CATEGORIES;
    category: string | undefined; 

    user$ = this.authService.user();
    name$ = this.user$.name;
    firstName$ = this.user$.firstName;
    photoUrl$ = this.user$.photoUrl;
    email$ = this.user$.email;

    form = new FormGroup({
        cardName: new FormControl('', Validators.required),
        cardNumber: new FormControl('', Validators.required),
        cvc: new FormControl('', Validators.required),
        expire: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
      });
    
    constructor(){
        this.category = this.route.snapshot.params['category'];

        this.form.controls.cardName.disable();
        this.form.controls.cardNumber.disable();
        this.form.controls.cvc.disable();
        this.form.controls.expire.disable();
    }

    ngOnInit(): void {
        if (this.category === "learner") {
            this.form.controls['category'].setValue('jsLearner');
        } else {
            this.form.controls['category'].setValue('jsAuthoring'); 
        } 
    }

    onSubmit() {
        // const { category } = this.form.value;
        // const data = { category } as IProfileUpdateRequest;
        // this.authService
        //     .updateProfile(data)
        //     .pipe(take(1))
        //     .subscribe({
        //         next: (res: IProfileUpdateReply) => {
        //             this.authService.user.set(res.user);
        //             this.router.navigate(['c4c', 'dashboard']);
        //         },
        //         error: (err) => {
        //             console.log(err);
        //         },
        //     });
    }
    
}
