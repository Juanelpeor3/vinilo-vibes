import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Hero } from './shared/components/hero/hero';

export const routes: Routes = [
    {
        path: "",
        component: MainLayout,
        children: [
            { path: "", component:Hero, title: "Home | Vinilo Vibes" }
        ]
    }
];
