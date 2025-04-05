import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CreateComponent } from './page/device/create/create.component';
import { DetailComponent } from './page/device/detail/detail.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { 
                path: 'device', 
                children: [
                    {
                        path: 'create',
                        component: CreateComponent 
                    },
                    {
                        path: ':id',
                        component: DetailComponent
                    }
                ]
            }
        ]
    }
];
