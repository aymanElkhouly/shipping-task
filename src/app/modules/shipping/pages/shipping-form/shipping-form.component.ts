import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharingDataService} from '../../Services/sharing-data.service';
import {routerPaths} from "../../consts/general.const";



@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {

  activeRoute:string;
  links=routerPaths;
  linksLength = routerPaths.length;

  constructor( private router:Router , private sharingData:SharingDataService) {

  }

  nexRoute(){
    let currentIndexOfRoute = this.links.indexOf(this.activeRoute);
    if(currentIndexOfRoute+1 <= this.linksLength){
      let nextRoute = this.links[currentIndexOfRoute+1];
      this.router.navigate([nextRoute]).then(()=>{
        this.setActiveLinkData(nextRoute);
      })
    }
  }
  prevRoute(){
    let currentIndexOfRoute = this.links.indexOf(this.activeRoute);
    if(currentIndexOfRoute-1 >= 0){
      let prevRoute = this.links[currentIndexOfRoute-1];
      this.router.navigate([prevRoute]).then(()=>{
        this.setActiveLinkData(prevRoute);
      })
    }
  }
  setActiveLinkData(link:string){
    this.sharingData.changeRouteLink(link);
  }
  ngOnInit(){
    this.sharingData.activeRoute.subscribe(link=> this.activeRoute = link);
  }

}
