import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../service/app.service';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { BaseService } from '../../../service/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  appService = inject(AppService);
  // httpClient = inject(HttpClient);

  products = signal<Product[]>(
    [
      {
        id: 0,
        name: 'Product 0',
        price: 100,
        description: 'Description 1',
        image: 'https://via.placeholder.com/150'
      }
    ]
  );

  constructor(httpClient: HttpClient, appService: AppService) {
    super(httpClient, `${appService.API_URL}/products`);
  }


}
