import { Component, inject, Input } from '@angular/core';
import { Purchase } from '../model/purchase';
import { PurchaseService } from '../service/purchase.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../service/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-purchase',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './list-purchase.component.html',
  styleUrl: './list-purchase.component.css'
})
export class ListPurchaseComponent {

  purchaseService = inject(PurchaseService);
  appService = inject(AppService);
  route = inject(ActivatedRoute);

  @Input() purchases!: Purchase[];

  userId!: any;

  constructor() { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    // se não houver id de usuário na rota, é pq está sendo acessada a rota para listar todas as purchases
    if (!this.userId) {
      this.getPurchases();
    }
  }

  getPurchases() {
    this.purchaseService.list().subscribe( purchases => {
      this.purchases = purchases;
      console.log(this.purchases);
    });
  }

  deletePurchase(id: any) {
    this.purchaseService.delete(id).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () => this.getPurchases()
    });
  }

  hoverStates: { [key: number]: boolean } = {};

  onMouseEnter(purchaseId: number) {
    this.hoverStates[purchaseId] = true;
  }

  onMouseLeave(purchaseId: number) {
    this.hoverStates[purchaseId] = false;
  }
}
