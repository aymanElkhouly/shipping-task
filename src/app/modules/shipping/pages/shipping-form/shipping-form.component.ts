import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharingDataService} from '../../Services/sharing-data.service';
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

  constructor( private router:Router , private sharingData:SharingDataService) {

  }

  nexRoute(){
    if(this.sharedRouteData["linkIndex"] + 1 <= this.linksLength){
      let nextRoute = this.links[this.sharedRouteData["linkIndex"] + 1];
      this.router.navigate([nextRoute]).then(()=>{
        this.sharedRouteData["linkIndex"] ++;
        this.setActiveLinkData(nextRoute);
      })
    }
  }
  prevRoute(){

    if(this.sharedRouteData["linkIndex"] - 1 >= 0){
      let prevRoute = this.links[this.sharedRouteData["linkIndex"] - 1];
      this.router.navigate([prevRoute]).then(()=>{
        this.sharedRouteData["linkIndex"] --;
        this.setActiveLinkData(prevRoute);
      })
    }
  }
  setActiveLinkData(link:string){
    this.sharedRouteData["link"] = link;
    this.sharingData.changeRouteLink(this.sharedRouteData);
  }
  ngOnInit(){
    this.sharingData.activeRoute.subscribe(link=> {
      this.sharedRouteData = link;
    });
  }

}
