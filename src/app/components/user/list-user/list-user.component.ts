import { Component, signal, WritableSignal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { AppService } from '../../../service/app.service';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {

  appService = inject(AppService);
  userService = inject(UserService);
  snackBar = inject(MatSnackBar);

  users!: WritableSignal<User[]>;
  home!: WritableSignal<string>;

  constructor() {
    this.users = this.userService.users;
    this.home = this.appService.home;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.list().subscribe( users => {
      this.users.set(users);
    });
  }

  onDelete(id: any) {
    if (id == localStorage.getItem('userId')) {
      // alert('Não é possível deletar o usuário logado.');

      this.snackBar.open('You cannot delete the logged user', "🚫", {
        duration:3000,
        panelClass: ['custom-class']
      });

      return;
    }
    this.userService.delete(id).subscribe( user => {
      this.getUsers();
    });
  }

}
