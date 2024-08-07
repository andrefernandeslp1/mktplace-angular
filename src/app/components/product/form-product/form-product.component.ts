import { AppService } from '../../../service/app.service';
import { Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FormGroup, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css'
})
export class FormProductComponent {

  form: FormGroup;

  productService = inject(ProductService);
  appService = inject(AppService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  home!: WritableSignal<string>;
  productId!: any;
  product!: any;

  constructor(private snackBar:MatSnackBar)
  {
    this.form = this.formBuilder.group({
      name: [null],
      price: [null],
      description: [null],
      image: [null]
    });
    this.home = this.appService.home;
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProductById();
  }

  onAdd(): void {
    this.productService.create(this.form.value).subscribe({
      next: (v) => console.log(v),
      error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 }),
      complete: () => console.log('complete')
    });
    this.router.navigate([this.appService.home()]);
  }

  onUpdate(): void {
    this.productService.update(this.productId, this.form.value).subscribe({
      next: (v) => console.log(v),
      error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 }),
      complete: () => console.log('complete')
    });
    this.router.navigate([this.appService.home()]);
  }

  getProductById() {
    if (this.productId) {
      this.productService.getOne(this.productId).subscribe(product => {
        this.product = product;
        this.form.patchValue(this.product);
      });
    }
  }

}
