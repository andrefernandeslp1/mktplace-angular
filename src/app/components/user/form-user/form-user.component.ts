import { Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { RouterModule } from '@angular/router';
import { AppService } from '../../../service/app.service';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
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

  roles!: Role[];
  // user!: WritableSignal<any>;
  user!: User;
  home!: WritableSignal<string>;
  userId!: any;
  userLogged!: WritableSignal<User>;

  constructor(private snackBar:MatSnackBar)
  {
    this.form = this.formBuilder.group({
      username: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      roles: this.formBuilder.group({
        admin: [false],
        client: [false],
        seller: [false]
      }, { validators: this.atLeastOneRoleValidator() }),
      image: ['http://w3schools.com/w3images/avatar' + this.randomNumGen() + '.png'],
      address: this.formBuilder.group({
        street: [null],
        city: [null],
        country: [null]
      })
    });
    this.userLogged = this.appService.userLogged;
    // this.roles = this.userService.roles;
    this.home = this.appService.home;
  }

  atLeastOneRoleValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const roles = control.value;
      return roles.admin || roles.seller || roles.client ? null : { atLeastOneRole: true };
    };
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.getUserById();
  }

  // onAdd(): void {
  //   if (this.form.valid) {
  //     var user = this.setUser();
  //     this.userService.create(user).subscribe({
  //       next: (v) => console.log(v),
  //       error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 }),
  //       complete: () => console.log('complete')
  //     });
  //     this.router.navigate(["/home/user/"]);
  //   } else {
  //     this.snackBar.open( 'Formulário Inválido', "⚠️", {duration:3000 });
  //   }
  // }

  onAdd(): void {
    if (this.form.valid) {
      var user = this.setUser();
      this.userService.create(user).subscribe({
        next: (v) => console.log(v),
        error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 }),
        complete: () => console.log('complete')
      });
      this.router.navigate(["/home/user/"]);
    }
    else {
      this.snackBar.open( 'Formulário Inválido: Email, Password e Role são campos obrigatórios!!!', "⚠️", {duration:3000 });
    }
  }

  onUpdate(): void {
    if (this.form.valid) {
      var user = this.setUser();
      this.userService.update(this.userId, user).subscribe({
        next: (v) => console.log(v),
        error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 }),
        complete: () => console.log('complete')
      });
      this.router.navigate(["/home/user/"]);
    }
    else {
      this.snackBar.open( 'Formulário Inválido: Email, Password e Role são campos obrigatórios!!!', "⚠️", {duration:3000 });
    }
  }

  setUser(): User {
    var user = {} as User;
    user.id = this.userId;
    user.username = this.form.value.username;
    user.email = this.form.value.email;
    user.password = this.form.value.password;
    user.roles = [];
    if (this.form.value.roles.admin) {
      user.roles?.push({ id: 1, name: 'admin' });
    }
    if (this.form.value.roles.client) {
      user.roles?.push({ id: 2, name: 'client' });
    }
    if (this.form.value.roles.seller) {
      user.roles?.push({ id: 3, name: 'seller' });
    }
    user.address = this.form.value.address;
    user.image = this.form.value.image;
    user.address = this.form.value.address;
    if(this.userId == this.userLogged().id) {
      this.appService.setLocalStorage(user);
      this.userLogged.set(user);
    }
    return user
  }

  getUserById() {
    if (this.userId) {
      this.userService.getOne(this.userId).subscribe(user => {
        // user.password = null;
        this.user = user;
        // console.log(user);
        // this.form.patchValue(this.user);
        this.form = this.formBuilder.group({
          username: [user.username],
          email: [user.email, [Validators.required, Validators.email]],
          password: [null, Validators.required],
          roles: this.formBuilder.group({
            admin: [this.isAdmin(user)],
            client: [this.isClient(user)],
            seller: [this.isSeller(user)]
          }, { validators: this.atLeastOneRoleValidator() }),
          image: [user.image],
          address: this.formBuilder.group({
            street: [user.address?.street],
            city: [user.address?.city],
            country: [user.address?.country]
          })
        });
        // this.form.patchValue(this.user);
        console.log(this.form.value);
      });
    }
  }

  //random number gererator fro 1 to 4
  randomNumGen() {
    return Math.floor(Math.random() * 6) + 1;
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

interface Role {
  id: number;
  name: string;
}
