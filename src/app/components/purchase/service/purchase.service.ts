import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AppService } from '../../../service/app.service';
import { BaseService } from '../../../service/base.service';
import { Purchase } from '../model/purchase';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends BaseService<Purchase> {

  route = inject(ActivatedRoute);

  purchase = signal<Purchase>({} as Purchase);

  userLogado!: WritableSignal<any>;

  constructor(httpClient: HttpClient, appService: AppService) {
    super(httpClient, `${appService.API_URL}/purchases`);

    this.userLogado = appService.userLogged;

    this.purchase.set({
      id: 0,
      userId: this.route.snapshot.params['id'],
      items: []
    });
  }

  onInit() {

  }





}
