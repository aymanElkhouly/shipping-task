import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharingDataService} from '../../Services/sharing-data.service';
import {ShippingService} from "../../Services/shipping.service";
import {routerPaths} from "../../consts/general.const";
import {linkData} from "../../consts/general.const";




@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {

  sharedRouteData:object = linkData;
  links=routerPaths;
  linksLength = routerPaths.length;
  isValidForm:boolean = false;
  formData:object;

  constructor( private router:Router ,
               private sharingData:SharingDataService,
               private shippingService:ShippingService) {
  }

  nexRoute(){

    this.sharingData.submitForm(this.sharedRouteData["link"]);

    if(this.sharedRouteData["linkIndex"] + 1 <= this.linksLength
      && this.formData["isValidForm"]){

      let nextRoute = this.links[this.sharedRouteData["linkIndex"] + 1];

      this.router.navigate([nextRoute]).then(()=>{

        //** set new link to current path **//
        this.sharedRouteData["linkIndex"] ++;

        //** set that to null to prevent submit form from child component (delivery) **//
        this.sharingData.submitForm(null);

        //** set current active route data for next use**//
        this.setActiveLinkData(nextRoute);
      });

    }

    // ** Save Product in final Step **//
    if(this.sharedRouteData["linkIndex"] + 1 == this.linksLength&&
      this.formData["isValidForm"]){
       this.saveProduct();
    }

  }
  prevRoute(){
    if(this.sharedRouteData["linkIndex"] - 1 >= 0){
      let prevRoute = this.links[this.sharedRouteData["linkIndex"] - 1];
      this.router.navigate([prevRoute]).then(()=>{
        //** set new link to current path **//
        this.sharedRouteData["linkIndex"] --;

        //** set current active route data for next use**//
        this.setActiveLinkData(prevRoute);
      })
    }
  }
  saveProduct(){
    this.shippingService.payProduct(this.formData).subscribe(
      res=> console.log("response",res) ,
      error => console.error(error)
    )
  }
  resetForm(){
    //** Reset Form data by shared service & observable **//
    this.sharingData.resetForm();

    // ** Back To delivery form & reset Data **//
    this.router.navigate([this.links[0]]).then(()=>{
      //** set new link to first path (delivery) **//
      this.sharedRouteData["linkIndex"] = 0;
      //** set that to null to prevent submit form from child component (delviery) **//
      this.sharingData.submitForm(null);
      this.setActiveLinkData(this.links[0]);
    });

  }
  setActiveLinkData(link:string){
    //** saving data with current route value to shared service for next use **//
    this.sharedRouteData["link"] = link;
    this.sharingData.changeRouteLink(this.sharedRouteData);
  }
  ngOnInit(){
   //** using rxjs subject behavior with service to share data between component **//
    this.sharingData.activeRoute.subscribe(link=> {
      this.sharedRouteData = link;
    });

    this.sharingData.currentFormData.subscribe(data=> {
      this.isValidForm = data.isValidForm;
      this.formData = data;
    });
  }

}
