import { PurchaseItem } from './../purchase/model/purchase-item';
import { Component, inject, Input, WritableSignal } from '@angular/core';
import { Purchase } from '../purchase/model/purchase';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../purchase/service/purchase.service';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  purchaseService = inject(PurchaseService);
  appService = inject(AppService);

  // @Input() purchase: Purchase;
  purchase!: WritableSignal<Purchase>;

  constructor() {
    this.purchase = this.purchaseService.purchase;
  }

  ngOnInit(): void {}

  getTotal(): number {
    return this.purchase().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  increaseItemQuantity(item: any) {
    item.quantity++;
    this.purchase.set(this.purchase());
  }

  decreaseItemQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.purchase.set(this.purchase());
    }
    else {
      this.removeItem(item);
    }
  }

  removeItem(item: any) {
    for (let i = 0; i < this.purchase().items.length; i++) {
      if (this.purchase().items[i] === item) {
        this.purchase().items.splice(i, 1);
        break;
      }
    }
    this.purchase.set(this.purchase());
  }

  clearCart() {
    // this.purchase().items = [];
    this.purchase.update(value => {
      value.items = [];
      return value;
    });
  }

  checkout() {
    this.purchase().userId = this.appService.userLogged().id;
    this.purchaseService.create(this.purchase()).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () => console.log('complete')
    });
    this.clearCart();
  }

}
