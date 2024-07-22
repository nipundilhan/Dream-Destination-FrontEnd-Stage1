import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { HeaderComponent } from './global_comman1/header/header.component';
import { SidenavComponent } from './global_comman1/sidenav/sidenav.component';
import { FooterComponent } from './global_comman1/footer/footer.component';
import { HomeComponent } from './global_comman1/home/home.component';
import { LoginComponent } from './global_comman1/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToursComponent } from './global_comman1/tours/tours.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import { Test1Component } from './global_comman1/test1/test1.component';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { SouvenirsComponent } from './global_comman1/souvenirs/souvenirs.component';
import { CreateProductComponent } from './product_module/create-product/create-product.component';
import { ViewProductsComponent } from './product_module/view-products/view-products.component';
import { ShowProductImagesDialogComponent } from './product_module/show-product-images-dialog/show-product-images-dialog.component';
import { ViewProductComponent } from './product_module/view-product/view-product.component';
import { ViewCartComponent } from './product_module/view-cart/view-cart.component';
import { CartCheckoutComponent } from './product_module/cart-checkout/cart-checkout.component';
import { Test2Component } from './global_comman1/test2/test2.component';
import { ViewProductsCustomerComponent } from './product_module/view-products-customer/view-products-customer.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewCartNonLoggedComponent } from './product_module/view-cart-non-logged/view-cart-non-logged.component';
import { Messagetype1DialogComponent } from './global_comman1/messagetype1-dialog/messagetype1-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CartCheckoutNonLoggedComponent } from './product_module/cart-checkout-non-logged/cart-checkout-non-logged.component';
import { ViewOrdersNonLogComponent } from './order_module/view-orders-non-log/view-orders-non-log.component';
import { OrderActionsNonLoggedComponent } from './order_module/order-actions-non-logged/order-actions-non-logged.component';
import { ShopAdminViewOrdersComponent } from './order_module/shop-admin-view-orders/shop-admin-view-orders.component';
import { ShopAdminEditOrderComponent } from './order_module/shop-admin-edit-order/shop-admin-edit-order.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmationPopupComponent } from './global_comman1/confirmation-popup/confirmation-popup.component';
import { OrderDetailsCommanComponent } from './order_module/order-details-comman/order-details-comman.component';
import { OrderSummeryCommanComponent } from './order_module/order-summery-comman/order-summery-comman.component';
import { OrderAllUnseenMsgsComponent } from './order_module/order-all-unseen-msgs/order-all-unseen-msgs.component';
import { EditProductComponent } from './product_module/edit-product/edit-product.component';
import { SettingsManualComponent } from './global_comman1/settings-manual/settings-manual.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ToursComponent,
    Test1Component,
    SouvenirsComponent,
    CreateProductComponent,
    ViewProductsComponent,
    ShowProductImagesDialogComponent,
    ViewProductComponent,
    ViewCartComponent,
    CartCheckoutComponent,
    Test2Component,
    ViewProductsCustomerComponent,
    ViewCartNonLoggedComponent,
    Messagetype1DialogComponent,
    CartCheckoutNonLoggedComponent,
    ViewOrdersNonLogComponent,
    OrderActionsNonLoggedComponent,
    ShopAdminViewOrdersComponent,
    ShopAdminEditOrderComponent,
    ConfirmationPopupComponent,
    OrderDetailsCommanComponent,
    OrderSummeryCommanComponent,
    OrderAllUnseenMsgsComponent,
    EditProductComponent,
    SettingsManualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatPaginatorModule,
    MatGridListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatInputModule ,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
