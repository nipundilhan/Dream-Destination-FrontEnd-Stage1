import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './global_comman1/home/home.component';
import { LoginComponent } from './global_comman1/login/login.component';
import { ToursComponent } from './global_comman1/tours/tours.component';
import { Test1Component } from './global_comman1/test1/test1.component';
import { SouvenirsComponent } from './global_comman1/souvenirs/souvenirs.component';
import { CreateProductComponent } from './product_module/create-product/create-product.component';
import { ViewProductsComponent } from './product_module/view-products/view-products.component';
import { ProductResolverService } from './_secondary_services/product-resolver.service';
import { ViewProductComponent } from './product_module/view-product/view-product.component';
import { ViewCartComponent } from './product_module/view-cart/view-cart.component';
import { CartCheckoutComponent } from './product_module/cart-checkout/cart-checkout.component';
import { ViewProductsCustomerComponent } from './product_module/view-products-customer/view-products-customer.component';
import { ViewCartNonLoggedComponent } from './product_module/view-cart-non-logged/view-cart-non-logged.component';
import { CartCheckoutNonLoggedComponent } from './product_module/cart-checkout-non-logged/cart-checkout-non-logged.component';
import { ViewOrdersNonLogComponent } from './order_module/view-orders-non-log/view-orders-non-log.component';
import { OrderActionsNonLoggedComponent } from './order_module/order-actions-non-logged/order-actions-non-logged.component';
import { ShopAdminViewOrdersComponent } from './order_module/shop-admin-view-orders/shop-admin-view-orders.component';
import { ShopAdminEditOrderComponent } from './order_module/shop-admin-edit-order/shop-admin-edit-order.component';
import { OrderAllUnseenMsgsComponent } from './order_module/order-all-unseen-msgs/order-all-unseen-msgs.component';
import { EditProductComponent } from './product_module/edit-product/edit-product.component';
import { AuthGuard } from './_auth/auth.guard';
import { SettingsManualComponent } from './global_comman1/settings-manual/settings-manual.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'lgn-stf', component: LoginComponent },
  { path: 'souvenirs', component: SouvenirsComponent },
  { path: 'test1', component: Test1Component },
  { path: 'tours', component: ToursComponent },
  { path: 'view-products', component: ViewProductsComponent },
  { path: 'create-product', component: CreateProductComponent,canActivate:[AuthGuard], data:{roles:['ADMIN'],prmsns:['CRT_PRDCT'] }   },
  { path: 'edit-product', component: EditProductComponent   },
  { path: 'view-product', component: ViewProductComponent  }, //,resolve:{ product : ProductResolverService} 
  { path: 'view-cart', component: ViewCartComponent },
  { path: 'view-cart-non-log', component: ViewCartNonLoggedComponent },
  { path: 'track-orders-non-log', component: ViewOrdersNonLogComponent },
  { path: 'order-actions-non-log', component: OrderActionsNonLoggedComponent },
  { path: 'view-products-non-log', component: ViewProductsCustomerComponent },
  { path: 'view-products-customer', component: ViewProductsCustomerComponent },
  { path: 'unread-messages', component: OrderAllUnseenMsgsComponent,canActivate:[AuthGuard], data:{roles:['ADMIN','STAFF'],prmsns:['VW_MSGS'] } },
  { path: 'cart-checkout', component: CartCheckoutComponent },
  { path: 'cart-checkout-non-logged', component: CartCheckoutNonLoggedComponent },
  { path: 'settings', component: SettingsManualComponent,canActivate:[AuthGuard], data:{roles:['ADMIN','STAFF'] } },
  { path: 'shop-owner-view-orders', component: ShopAdminViewOrdersComponent,canActivate:[AuthGuard], data:{roles:['ADMIN','STAFF'] } },
  { path: 'shop-owner-edit-order', component: ShopAdminEditOrderComponent,canActivate:[AuthGuard], data:{roles:['ADMIN','STAFF'] } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
