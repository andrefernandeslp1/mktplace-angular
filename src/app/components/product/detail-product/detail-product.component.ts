import { inject } from '@angular/core';
import { ProductService } from './../service/product.service';
import { Component } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../../purchase/service/purchase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {

  purchaseService = inject(PurchaseService);
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  product!: any;
  productId!: number;

  constructor() {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getById(this.productId);
  }

  getById(id: number) {
    this.productService.getOne(id)
    .subscribe({
      next: (v) => this.product = v,
      error: (e) => console.error(e),
      complete: () => console.log('complete')
    });
  }

  onDelete(id: number) {
    this.productService.delete(id)
    .subscribe({
      next: (v) => {
        console.log(v),
        this.router.navigate(['/home/product/']);
      },
      error: (e) => console.error(e),
      complete: () => console.log('complete')
    });
  }

  editProduct(id: any) {
    this.router.navigate(['/home/product/' + id + '/edit/']);
  }

  addProductToCart(product: any) {
    // se purchase contiver este product, incrementar a quantidade
    // senão, adicionar o product com quantidade 1
    const item = this.purchaseService.purchase().items.find(item => item.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.purchaseService.purchase().items.push({ product, quantity: 1 });
    }
    this.snackBar.open('Product added to cart', "🛒", {
      duration:3000,
    });
  }




}
