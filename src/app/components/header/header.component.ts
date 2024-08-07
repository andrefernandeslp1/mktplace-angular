import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AppService } from '../../service/app.service';
import { User } from '../user/model/user';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MenuComponent,
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  appService = inject(AppService);
  router = inject(Router);

  user!: WritableSignal<User>;
  home!: WritableSignal<string>;

  constructor(private location: Location) {
    this.user = this.appService.userLogged;
    this.home = this.appService.home;
  }

  ngOnInit(): void {
    console.log(this.user().email);
  }

  viewUser() {
    this.router.navigate(['/home/user/' + localStorage.getItem('userId')]);
  }

  editUser() {
    this.router.navigate(['/home/user/' + localStorage.getItem('userId') + '/edit/']);
  }

  onExit() {
    localStorage.clear();
    this.appService.userLogged.set({});
    this.router.navigate(['/']);
  }

  isSelected(path: string) {
    //return this.location.path().toString().startsWith(path);
    //retonr o path exato
    return this.location.path().toString() === path;
  }
}
