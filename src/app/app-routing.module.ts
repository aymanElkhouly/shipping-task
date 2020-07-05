import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShippingFormComponent} from "./modules/shipping/pages/shipping-form/shipping-form.component";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/shipping/shipping-routing.module').then((m) => m.shippingRoutingModule)
  },
  { path: '**',
    loadChildren: () => import('./modules/shipping/shipping-routing.module').then((m) => m.shippingRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
