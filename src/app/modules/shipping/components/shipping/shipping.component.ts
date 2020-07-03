import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingType = "standardShipping";
  isGift = false;
  giftReceipt = false;
  gitWrap = false;
  constructor() { }

  ngOnInit(): void {
  }

}
