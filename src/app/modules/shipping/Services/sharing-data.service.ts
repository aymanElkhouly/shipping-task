import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private routeLink =  new BehaviorSubject<string>("delivery");
  activeRoute = this.routeLink.asObservable();
  constructor() { }
  changeRouteLink(link:string){
    this.routeLink.next(link);
  }
}
