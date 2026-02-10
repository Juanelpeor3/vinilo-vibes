import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './pages/home/home';
import { AuthPage } from './pages/auth-page/auth-page';
import { Login } from './pages/auth-page/login/login';
import { Register } from './pages/auth-page/register/register';
import { PageNotFound } from './pages/page-not-found/page-not-found';

export const routes: Routes = [
    {
        path: "",
        component: MainLayout,
        children: [
            { path: "", component: Home, title: "Vinilo Vibes" }
        ]
    },
    {
        path: "auth",
        component: AuthPage,
        children: [
            { path: "login", component: Login, title: "Login | Vinilo Vibes" },
            { path: "register", component: Register, title: "Register | Vinilo Vibes" },
            { path: '', redirectTo: 'register', pathMatch: 'full' }
        ]
    },
    { path: "**", component: PageNotFound, title: "404 Not Found" }
];
