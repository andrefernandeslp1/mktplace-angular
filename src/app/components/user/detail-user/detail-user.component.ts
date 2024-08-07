import { Component, inject, Input, WritableSignal } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { HeaderComponent } from "../../header/header.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppService } from '../../../service/app.service';
import { ListPurchaseComponent } from "../../purchase/list-purchase/list-purchase.component";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    ListPurchaseComponent
],
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent {

  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  appService = inject(AppService);
  httpClient = inject(HttpClient);

  userDetail!: any;
  home!: WritableSignal<string>;
  userId!: any;
  purchases!: any[];
  roleBadge = 'badge text-bg-dark';

  constructor() {
    this.home = this.appService.home;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserById();
      this.getPurchases();
    });
  }

  getUserById() {
    this.userService.getOne(this.userId).subscribe(user => {
      this.userDetail = user;
      // this.getRoleBadge(user.role as string);
    });
  }

  getPurchases() {
    this.listPurchasesByUserId(this.userId).subscribe(purchases => {
      this.purchases = purchases;
      console.log(this.purchases);
    });
  }

  // FORMA DE RECUPERAR COMPRAS POR ID DO USUÁRIO NO ESTILO JSON-SERVER //
  listPurchasesByUserId(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.appService.API_URL}/purchases?userId=${id}`);
  }

  getRoleBadge(role: string) {
    if (role == 'admin') {
      this.roleBadge = 'badge bg-danger';
    } else if (role == 'seller') {
      this.roleBadge = 'badge bg-warning';
    } else {
      this.roleBadge = 'badge bg-dark';
    }
  }

}
