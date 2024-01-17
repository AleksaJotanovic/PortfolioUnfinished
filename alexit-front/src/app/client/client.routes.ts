import { Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientMainComponent } from './components/client-main/client-main.component';
import { CartComponent } from './pages/cart/cart.component';

export const clientRoutes: Routes = [
    {
        path: '', component: ClientComponent, children: [
            { path: '', component: ClientMainComponent },
            { path: 'cart', component: CartComponent }
        ]
    }
];
