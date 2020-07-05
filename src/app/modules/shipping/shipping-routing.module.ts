import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ShippingFormComponent } from './pages/shipping-form/shipping-form.component';
import {routerLinks} from "./consts/general.const";

const routes: Routes = [
  {
    path: '',
    component: ShippingFormComponent,
    children: [
      { path: routerLinks.delivery, component: DeliveryComponent },
      { path: routerLinks.shipping, component: ShippingComponent},
      { path: routerLinks.payment, component: PaymentComponent},
      { path: '', redirectTo: routerLinks.indexRoute,pathMatch: 'full'},
      /*{ path: '**', component: DeliveryComponent },*/
      { path: '**', redirectTo: routerLinks.indexRoute,pathMatch: 'full' },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]


})
export class shippingRoutingModule {}
