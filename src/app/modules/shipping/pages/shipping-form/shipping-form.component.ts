import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {SharingDataService} from '../../Services/sharing-data.service';
import {ShippingService} from "../../Services/shipping.service";
import {routerPaths} from "../../consts/general.const";
import {linkData} from "../../consts/general.const";
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  sharedRouteData: object = linkData;
  links = routerPaths;
  linksLength = routerPaths.length;
  isValidForm: boolean = false;
  formData: object;
  subscription: Subscription;


  constructor(private router: Router,
              private sharingData: SharingDataService,
              private shippingService: ShippingService) {
  }


  nexRoute() {
    //** firing Shared data Service With RXJs To submit any child component form **//
    this.sharingData.submitForm(this.sharedRouteData["link"]);

    debugger
    if (this.sharedRouteData["linkIndex"] + 1 < this.linksLength && this.formData["isValidForm"]) {
      //** Get Next Route **//
      let nextRoute = this.links[this.sharedRouteData["linkIndex"] + 1];

      this.router.navigate([nextRoute]).then(() => {

        //** set new link to current path **//
        this.sharedRouteData["linkIndex"]++;

        //** set that to null to prevent submit form from child component (delivery) **//
        this.sharingData.submitForm(null);

        //** set current active route data for next use**//
        this.setActiveLinkData(nextRoute);
      });

    }


    // ** Save Product in final Step **//
    if (this.sharedRouteData["linkIndex"] + 1 == this.linksLength && this.formData["isValidForm"]) {
      this.saveProduct();
    }

  }

  prevRoute() {
    if (this.sharedRouteData["linkIndex"] - 1 >= 0) {
      let prevRoute = this.links[this.sharedRouteData["linkIndex"] - 1];
      this.router.navigate([prevRoute]).then(() => {
        //** set new link to current path **//
        this.sharedRouteData["linkIndex"]--;

        //** set current active route data for next use**//
        this.setActiveLinkData(prevRoute);
      })
    }
  }

  saveProduct() {
    this.subscription = this.shippingService.payProduct(this.formData).subscribe(
      res => console.log("response", res),
      error => console.error(error),
      () => {
        this.resetForm();
      }
    )
  }

  resetForm() {
    //** Reset Form data by shared service & observable **//
    this.sharingData.resetForm(true);

    // ** Back To delivery form & reset Data **//
    this.router.navigate([this.links[0]]).then(() => {
      //** set new link to first path (delivery) **//
      this.sharedRouteData["linkIndex"] = 0;
      //** set that to null to prevent submit form from child component (delviery) **//
      this.sharingData.submitForm(null);
      this.setActiveLinkData(this.links[0]);
    });

  }

  setActiveLinkData(link: string) {
    //** saving data with current route value to shared service for next use **//
    this.sharedRouteData["link"] = link;
    this.sharingData.changeRouteLink(this.sharedRouteData);
  }

  ngOnInit() {
    //** using rxjs subject behavior with service to share data between component **//
    this.subscription = this.sharingData.activeRoute.subscribe(link => {
      this.sharedRouteData = link;
    });

    this.subscription = this.sharingData.currentFormData.subscribe(data => {
      this.isValidForm = data.isValidForm;
      this.formData = data;
    });
  }

  ngOnDestroy(): void {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
