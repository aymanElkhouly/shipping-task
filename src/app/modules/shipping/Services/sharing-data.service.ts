import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import {linkData} from "../consts/general.const";


@Injectable({
  providedIn: 'root'
})
export class SharingDataService {


  private routeLink =  new BehaviorSubject<any>(linkData);
  activeRoute = this.routeLink.asObservable();

  private formData = new BehaviorSubject<any>({isValid:false})
  currentFormData = this.formData.asObservable();

  private onSubmitForm = new BehaviorSubject<string>("")
  submitFormComponent = this.onSubmitForm.asObservable();



  constructor() { }

  changeRouteLink(link:object){
    this.routeLink.next(link);
  }

  setFormData(formData:any){
    this.formData.next(formData);
  }

  submitForm(name){
    this.onSubmitForm.next(name);
  }

}
