import { Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FormGroup, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { RouterModule } from '@angular/router';
import { AppService } from '../../../service/app.service';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {

  appService = inject(AppService);
  userService = inject(UserService);

  form: FormGroup;

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  roles!: WritableSignal<string[]>;
  // user!: WritableSignal<any>;
  user!: any;
  home!: WritableSignal<string>;
  userId!: any;

  constructor(private snackBar:MatSnackBar)
  {
    this.form = this.formBuilder.group({
      username: [null],
      email: [null],
      password: [null],
      roles: this.formBuilder.group({
        admin: [false],
        client: [false],
        seller: [false]
      }),
      image: [null],
      address: this.formBuilder.group({
        street: [null],
        city: [null],
        country: [null]
      })
    });
    // this.user = this.appService.userLogged;
    this.roles = this.userService.roles;
    this.home = this.appService.home;
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.getUserById();
  }

  onAdd(): void {
    this.userService.create(this.form.value).subscribe({
      next: (v) => console.log(v),
      error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 }),
      complete: () => console.log('complete')
    });
    this.router.navigate(["/home/user/"]);
  }

  onUpdate(): void {
    this.userService.update(this.userId, this.form.value).subscribe({
      next: (v) => console.log(v),
      error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 }),
      complete: () => console.log('complete')
    });
    this.router.navigate(["/home/user/"]);
  }

  getUserById() {
    if (this.userId) {
      this.userService.getOne(this.userId).subscribe(user => {
        this.user = user;
        // this.form.patchValue(this.user);
        this.form = this.formBuilder.group({
          username: [null],
          email: [null],
          password: [null],
          roles: this.formBuilder.group({
            admin: [this.isAdmin(user)],
            client: [this.isClient(user)],
            seller: [this.isSeller(user)]
          }),
          image: [null],
          address: this.formBuilder.group({
            street: [null],
            city: [null],
            country: [null]
          })
        });
        this.form.patchValue(this.user);
      });
    }

  }

  isAdmin(user: any) {
    for (let role of user.roles) {
      if (role.name == 'admin') {
        return true;
      }
    }
    return false;
  }

  isSeller(user: any) {
    for (let role of user.roles) {
      if (role.name == 'seller') {
        return true;
      }
    }
    return false;
  }

  isClient(user: any) {
    for (let role of user.roles) {
      if (role.name == 'client') {
        return true;
      }
    }
    return false;
  }


}
