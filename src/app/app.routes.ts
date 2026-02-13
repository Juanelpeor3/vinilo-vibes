import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './pages/home/home';
import { AuthPage } from './pages/auth-page/auth-page';
import { Login } from './pages/auth-page/login/login';
import { Register } from './pages/auth-page/register/register';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { Profile } from './pages/profile/profile';
import { authGuard } from './guards/auth-guard/auth-guard';
import { VinylList } from './pages/vinyl-list/vinyl-list';
import { VinylDetails } from './pages/vinyl-details/vinyl-details';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { roleGuard } from './guards/role-guard/role-guard';

export const routes: Routes = [
    {
        path: "auth",
        component: AuthPage,
        children: [
            { path: "login", component: Login, title: "Login | Vinilo Vibes" },
            { path: "register", component: Register, title: "Register | Vinilo Vibes" },
            { path: '', redirectTo: 'register', pathMatch: 'full' }
        ]
    },
    {
        path: "",
        component: MainLayout,
        children: [
            { path: "", component: Home, title: "Vinilo Vibes" },
            { path: "profile", component: Profile, title: "Profile | Vinilo Vibes", canActivate: [authGuard] },
            { path: "collections/vinyls", component: VinylList, title: "Vinyls | Vinilo Vibes" },
            { path: "collections/vinyls/:id", component: VinylDetails, title: "Vinilo Vibes" }, // También tiene título dinámico
            { path: "collections/genres/:genreId", component: VinylList, title: "Vinilo Vibes" },
            { path: "dashboard", component: AdminDashboard, title: "Vinilo Vibes", canActivate: [authGuard, roleGuard], data: { roles: ['admin'] } },
            { path: "**", component: PageNotFound, title: "404 Not Found" }
        ]
    },


];
