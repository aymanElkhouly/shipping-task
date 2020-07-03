import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ShippingFormComponent } from './pages/shipping-form/shipping-form.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {shippingRoutingModule} from "./shipping-routing.module";

@NgModule({
  declarations: [
    DeliveryComponent, NavbarComponent, ShippingComponent,
    PaymentComponent, ShippingFormComponent
  ],
  exports: [
    ShippingFormComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    NgbModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    shippingRoutingModule
  ]
})
export class ShippingAppModule { }
