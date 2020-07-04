import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharingDataService} from '../../Services/sharing-data.service'
import {routerPaths} from "../../consts/general.const";
import {linkData} from "../../consts/general.const";


@Component({
  selector: 'delivery-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private sharingData:SharingDataService, private router:Router ) { }
  links = routerPaths;
  activeLink = linkData;
  isValidFormData:boolean= false;

  setActiveLink(link:string, index){
    //** Set Current Active Link Data **//
    this.activeLink = {
      link:link,
      linkIndex:index
    };

    //** Route To Clicked Link if form valid **//
    if(this.isValidFormData){
      this.router.navigate([link]).then(()=>{
        // ** Set New link Data After Navigate To shared data Service **//
        this.sharingData.changeRouteLink(this.activeLink);
      })
    }
  }
  ngOnInit(){
    // ** Listen to changes for route navigation from parent component over service **//
    this.sharingData.activeRoute.subscribe(link=> this.activeLink = link);

    // ** Listen to changes on form to check if data valid or not from other component over service **//
    this.sharingData.currentFormData.subscribe(formData=> {
      this.isValidFormData = formData.isValidForm;
    });
  }

}

