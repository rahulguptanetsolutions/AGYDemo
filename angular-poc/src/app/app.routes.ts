import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'products',
        loadChildren: () => import('./features/products/product.routes').then(m => m.PRODUCT_ROUTES),
        canActivate: [authGuard]
    }
];
