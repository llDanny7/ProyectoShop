import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from "@angular/router";
import { ProductsComponent } from 'app/products/products.component';
import { CheckOutComponent } from 'app/check-out/check-out.component';
import { OrderSuccessComponent } from 'app/order-success/order-success.component';
import { AdminProductsComponent } from 'app/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from 'app/admin/admin-orders/admin-orders.component';

export var routerShopModule = RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'check-out', component: CheckOutComponent },
    { path: 'order-success', component: OrderSuccessComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin/products', component: AdminProductsComponent },
    { path: 'admin/orders', component: AdminOrdersComponent },
])