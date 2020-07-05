import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import {linkData} from "../consts/general.const";
import {FormData} from "../consts/form-data";


@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  public formData = new FormData();

  private routeLink = new BehaviorSubject<any>(linkData);
  activeRoute = this.routeLink.asObservable();

  private formDataObser = new BehaviorSubject<any>(this.formData)
  currentFormData = this.formDataObser.asObservable();

  private onSubmitForm = new BehaviorSubject<string>("")
  submitFormComponent = this.onSubmitForm.asObservable();

  private resetFormSubj = new BehaviorSubject<any>("")
  resetFormObserv = this.resetFormSubj.asObservable();

  constructor() {
  }

  changeRouteLink(link: object) {
    this.routeLink.next(link);
  }

  setFormData(formData: any) {
    this.formDataObser.next(formData);
  }

  submitForm(name) {
    this.onSubmitForm.next(name);
  }

  resetForm(state) {
    this.resetFormSubj.next(state);
    this.formDataObser.next(new FormData());
  }

}
