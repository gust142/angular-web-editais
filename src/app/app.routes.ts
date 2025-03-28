import { Routes } from '@angular/router';
import { EditaisComponent } from './components/editais/editais.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    { path: '', redirectTo: '/editais', pathMatch: 'full' },
    { path: 'editais', component: EditaisComponent },
    { path: 'detalhes', component: DetalhesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
];
