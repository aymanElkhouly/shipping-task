import { Component, OnInit } from '@angular/core';
import {SharingDataService} from '../../Services/sharing-data.service'
import {routerPaths} from "../../consts/general.const";

@Component({
  selector: 'delivery-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private sharingData:SharingDataService ) { }
  links = routerPaths;
  activeLink = this.links[0];

  setActiveLink(link:string){
    this.activeLink = link;
    this.sharingData.changeRouteLink(link);
  }
  ngOnInit(){
    this.sharingData.activeRoute.subscribe(link=> this.activeLink = link);
  }

}

