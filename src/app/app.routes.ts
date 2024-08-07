import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { DetailProductComponent } from './components/product/detail-product/detail-product.component';
import { DetailPurchaseComponent } from './components/purchase/detail-purchase/detail-purchase.component';
import { ListPurchaseComponent } from './components/purchase/list-purchase/list-purchase.component';
import { DetailUserComponent } from './components/user/detail-user/detail-user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormProductComponent } from './components/product/form-product/form-product.component';
import { FormUserComponent } from './components/user/form-user/form-user.component';
import { FormPurchaseComponent } from './components/purchase/form-purchase/form-purchase.component';

export const routes: Routes = [

  { path: '', redirectTo: '/landing', pathMatch: 'full' },

  { path: 'landing', component: LandingPageComponent },

  { path: 'unauthorized', component: UnauthorizedComponent },

  {
    path: 'home',
    component: HomeComponent,
    children: [
      // PRODUCT
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/product'
      },
      { path: 'product',
        children: [
          {
            path: '',
            loadComponent: () => import('./components/product/list-product/list-product.component').then(m => m.ListProductComponent),
          },
          {
            path: 'new',
            component: FormProductComponent,
            canActivate: [roleGuard],
            data: {expectedRoles: ['seller', 'admin']}
          },
          {
            path: ':id', component: DetailProductComponent
          },
          {
            path: ':id/edit',
            component: FormProductComponent,
            canActivate: [roleGuard],
            data: {expectedRoles: ['seller', 'admin']}
          },
        ]
      },
      // USER
      {
        path: 'user',
        children: [
          {
            path: '',
            loadComponent: () => import('./components/user/list-user/list-user.component').then(m => m.ListUserComponent),
            canActivate: [roleGuard],
            data: {expectedRoles: ['admin']},
          },
          {
            path: 'new',
            component: FormUserComponent,
            canActivate: [roleGuard],
            data: {expectedRoles: ['admin']}
          },
          {
            path: ':id',
            component: DetailUserComponent,
            canActivate: [roleGuard],
            data: {expectedRoles: ['admin', 'client']}
          },
          {
            path: ':id/edit',
            component: FormUserComponent,
            canActivate: [roleGuard],
            data: {expectedRoles: ['admin', 'client']}
          },
        ],

      },
      // PURCHASE
      {
        path: 'purchase',
        children: [
          {
            path: '',
            loadComponent: () => import('./components/purchase/list-purchase/list-purchase.component').then(m => m.ListPurchaseComponent),
            canActivate: [roleGuard],
            data: {expectedRoles: ['admin']}
          },
          {
            path: 'new',
            component: FormPurchaseComponent,
            canActivate: [roleGuard],
            data: {expectedRoles: ['admin', 'client']}
          },
          {
            path: ':id',
            component: DetailPurchaseComponent,
            canActivate: [roleGuard],
            data: {expectedRoles: ['admin', 'client']}
          },
          {
            path: ':id/edit',
            component: FormPurchaseComponent,
            canActivate: [roleGuard],
            data: {expectedRoles: ['admin', 'client']}
          },
        ],
      },
      // SHOPPING CART
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadComponent: () => import('./components/shopping-cart/shopping-cart.component').then(m => m.ShoppingCartComponent),
            canActivate: [authGuard]
          }
        ]
      },
    ]
  },

  { path: '**', component: PageNotFoundComponent },

];
