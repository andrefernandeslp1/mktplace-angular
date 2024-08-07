import { Component, signal, WritableSignal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { HeaderComponent } from "../../header/header.component";
import { AppService } from '../../../service/app.service';
import { PurchaseService } from '../../purchase/service/purchase.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent
],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {

  purchaseService = inject(PurchaseService);
  productService = inject(ProductService);
  appService = inject(AppService);
  router = inject(Router);

  products!: WritableSignal<Product[]>;
  home!: WritableSignal<string>;

  constructor(private snackBar:MatSnackBar) {
    this.products = this.productService.products;
    this.home = this.appService.home;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.list().subscribe( products => {
      this.products.set(products);
    });
  }

  viewProduct(id: any) {
    this.router.navigate(['/home/product/' + id]);
  }

  editProduct(id: any) {
    this.router.navigate(['/home/product/' + id + '/edit/']);
  }

  onDelete(id: any) {
    this.productService.delete(id).subscribe( product => {
      this.getProducts();
    });
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
