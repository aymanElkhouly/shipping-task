import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeliveryComponent } from './modules/shipping-module/components/delivery/delivery.component';
import { NavbarComponent } from './modules/shipping-module/components/navbar/navbar.component';
import { ShippingComponent } from './modules/shipping-module/components/shipping/shipping.component';
import { PaymentComponent } from './modules/shipping-module/components/payment/payment.component';
import { ShippingFormComponent } from './modules/shipping-module/pages/shipping-form/shipping-form.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    AppComponent,
    DeliveryComponent,
    NavbarComponent,
    ShippingComponent,
    PaymentComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgbModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
