import { JWTTokenService } from './jwttoken.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../components/user/model/user';
import { Address } from '../components/user/model/address';
import { Product } from '../components/product/model/product';
import { Purchase } from '../components/purchase/model/purchase';
import { PurchaseItem } from '../components/purchase/model/purchase-item';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  jwtTokenService = inject(JWTTokenService);

  home = signal<string>('/home/product');

  userLogged = signal<any>({
    id: localStorage.getItem('userId'),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    roles: JSON.parse(localStorage.getItem('roles') || '[]'),
  });

  public API_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  signup(user: User): Observable<HttpResponse<any>>{
    return this.httpClient.post<any>(this.API_URL + "/users", user, { observe: 'response' }).pipe(
      tap(response => {

        const token = response.body?.accessToken;
        if (token) {
          localStorage.setItem('authToken', token);
        }
        if(response.body.user.id) {
          // localStorage.setItem('userId', response.body.user.id);
          this.setLocalStorage(response.body.user);
        }
        this.userLogged.set(response.body.user);
      })
    );
  }

  signin(user: User): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.API_URL + "/signin", user, { observe: 'response' }).pipe(
      tap(response => {

        const token = response.body?.accessToken;
        if (token) {
          localStorage.setItem('authToken', token);
        }
        if(response.body.user.id) {
          // localStorage.setItem('userId', response.body.user.id);
          this.setLocalStorage(response.body.user);
        }
        this.userLogged.set(response.body.user);
      })
    );
  }

  setLocalStorage(user: any): void {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('roles', JSON.stringify(user.roles));
  }
}
