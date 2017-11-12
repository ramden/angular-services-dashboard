import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {CoreModule} from './core/core.module';
import {DashboardModule} from './features/dashboard/dashboard.module';
import {DashboardComponent} from './features/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CoreModule,
    DashboardModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
