import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../model/user';
import { JWTTokenService } from '../../../service/jwttoken.service';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../service/app.service';
import { BaseService } from '../../../service/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  roles = signal<string[]>(['client', 'seller', 'admin']);

  jwtTokenService = inject(JWTTokenService);

  // userDetail = signal<User>(
  users = signal<any[]>([
    {
      id: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      password: '',
      image: 'https://w3schools.com/w3images/avatar0.png',
      roles: JSON.parse(localStorage.getItem('roles') || '[]'),
      address:{
        id: 0,
        street: 'Av. Rio Branco',
        city: 'Natal',
        country: 'Brasil'
      },
      purchases: [
        {
          id: 0,
          userId: 0,
          items: [
            {
              id: 0,
              product: {
                id: 0,
                name: 'product 0',
                price: 100,
                description: 'description 0',
                image: 'https://via.placeholder.com/150'
              },
              quantity: 10
            }
          ],
        }
      ]
    },
  ]);

  constructor(httpClient: HttpClient, appService: AppService) {
    super(httpClient, `${appService.API_URL}/users`);
  }

  // getUserById(userId: any): any {
  //   return this.users().find(user => user.id == userId);
  // }

}
