import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  form: FormGroup;

  appService = inject(AppService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  constructor(private snackBar:MatSnackBar)
  {
    this.form = this.formBuilder.group({
      username: [null],
      email: [null],
      password: [null],
      roles: [[{'id':2, 'name':'client'}]],
      image: ['http://w3schools.com/w3images/avatar' + this.randomNumGen() + '.png'],
      address: this.formBuilder.group({
        street: [null],
        city: [null],
        country: [null]
      })
    });
  }

  //random number gererator fro 1 to 4
  randomNumGen() {
    return Math.floor(Math.random() * 6) + 1;
  }

  onSignUp() {
    this.appService.signup(this.form.value).subscribe({
      next: (v) => {
        console.log(v),
        this.router.navigate([this.appService.home()]);
      },
      // error: (e) => console.error(e)
      error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 }),
      complete: () => console.log('complete')
    });
  }

  onSignIn() {
    this.appService.signin(this.form.value).subscribe({
      next: (v) => {
        console.log(v),
        this.router.navigate([this.appService.home()]);
      },
      // error: (e) => console.error(e)
      error: (e) => this.snackBar.open(e.error, "⚠️", {duration:3000 }),
      complete: () => console.log('complete')
    });
  }

}
