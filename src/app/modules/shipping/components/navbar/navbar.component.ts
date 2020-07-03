import { Component, OnInit } from '@angular/core';
import {SharingDataService} from '../../Services/sharing-data.service'
import {routerPaths} from "../../consts/general.const";
import {linkData} from "../../consts/general.const";


@Component({
  selector: 'delivery-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private sharingData:SharingDataService ) { }
  links = routerPaths;
  activeLink = linkData;

  setActiveLink(link:string, index){
    this.activeLink = {
      link:link,
      linkIndex:index
    };
    this.sharingData.changeRouteLink(this.activeLink);
  }
  ngOnInit(){
    this.sharingData.activeRoute.subscribe(link=> this.activeLink = link);
  }

}

