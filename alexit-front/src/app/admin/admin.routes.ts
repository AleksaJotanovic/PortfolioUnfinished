import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderComponent } from './pages/orders/order/order.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/users/user/user.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard } from './guards/login.guard';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UsersMainComponent } from './pages/users/users-main/users-main.component';
import { usersGuard } from './guards/users.guard';
import { ProductsMainComponent } from './pages/products/products-main/products-main.component';
import { OrdersMainComponent } from './pages/orders/orders-main/orders-main.component';
import { SalesComponent } from './pages/sales/sales.component';

export const adminRoutes: Routes = [
    {
        path: 'admin', component: AdminComponent, canActivate: [loginGuard], children: [
            { path: '', component: DashboardComponent },
            {
                path: 'products', component: ProductsComponent, children: [
                    { path: '', component: ProductsMainComponent },
                    { path: 'edit-product/:id', component: EditProductComponent }
                ]
            },
            { path: 'add-product', component: AddProductComponent },
            { path: 'categories', component: CategoriesComponent },
            {
                path: 'orders', component: OrdersComponent, children: [
                    { path: '', component: OrdersMainComponent },
                    { path: 'order/:id', component: OrderComponent },
                ]
            },
            {
                path: 'users', component: UsersComponent, canActivate: [usersGuard], children: [
                    { path: '', component: UsersMainComponent },
                    { path: 'user/:id', component: UserComponent },
                    { path: 'add-user', component: AddUserComponent }
                ]
            },
            { path: 'configuration', component: ConfigurationComponent },
            { path: 'sales', component: SalesComponent, canActivate: [usersGuard] }
        ],
    },
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin/forget-password', component: ForgetPasswordComponent },
    { path: 'admin/reset/:token', component: ResetPasswordComponent },
];
