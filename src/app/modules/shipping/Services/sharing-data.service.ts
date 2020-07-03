import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import {linkData} from "../consts/general.const";


@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private routeLink =  new BehaviorSubject<any>(linkData);
  activeRoute = this.routeLink.asObservable();
  constructor() { }
  changeRouteLink(link:object){
    this.routeLink.next(link);
  }
}
