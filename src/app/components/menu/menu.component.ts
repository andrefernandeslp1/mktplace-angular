import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  menu = [
    {
      nome: 'PRODUCTS',
      path: '/home/product',
    },
    {
      nome: 'PURCHASES',
      path: '/home/purchase',
    },
    {
      nome: 'USERS',
      path: '/home/user',
    },
  ]


  constructor(private location: Location) {}

  isSelected(path: string) {
    return this.location.path().toString().startsWith(path)
  }

}
