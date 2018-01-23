import { AdminGuard } from './admin.guard';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from "@angular/router";
import { ProductsComponent } from 'app/products/products.component';
import { CheckOutComponent } from 'app/check-out/check-out.component';
import { OrderSuccessComponent } from 'app/order-success/order-success.component';
import { AdminProductsComponent } from 'app/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from 'app/admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from 'app/my-orders/my-orders.component';
import { AuthGuard } from 'app/auth.guard';
import { ProductFormComponent } from 'app/admin/product-form/product-form.component';

export var routerShopModule = RouterModule.forRoot([
    { path: '', component: ProductsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
    { path: 'order-success', component: OrderSuccessComponent },
    { path: 'my/orders', component: MyOrdersComponent },
    { path: 'login', component: LoginComponent },    
    { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminGuard] },
])