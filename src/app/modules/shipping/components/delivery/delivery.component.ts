import { Component, OnInit,ViewChild, AfterViewInit,OnDestroy } from '@angular/core';
import {Form, FormControl, NgForm, Validators} from '@angular/forms';
import { SharingDataService } from '../../Services/sharing-data.service'
import { Subscription }   from 'rxjs';
import { FormData } from '../../consts/form-data';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit,AfterViewInit,OnDestroy{
  isSameBilling = false;
  passwordPattern:string
  subscription: Subscription;
  formData = new FormData();

  @ViewChild("deliveryForm") form: NgForm;

  constructor(private sharingData:SharingDataService) {
   this.passwordPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}";
  }
  submitForm(){
      this.form.onSubmit(null);
      this.formData.isValidForm = this.form.valid;
      this.sharingData.setFormData(this.formData);
  }

  passwordMatcherValidator(){
    if(this.formData.password !== this.formData.password_confirmation){
      //this.form.form.setErrors({matchPassword: true});
    }
  }

  ngOnInit(): void {
     console.log("formDataOnInit",this.formData);
  }

  ngAfterViewInit(): void {

    setTimeout(()=>{

      //this.sharingData.setFormData(this.formData);

      this.subscription = this.sharingData.currentFormData.subscribe(data=> {
        this.formData = data;
        console.log("formDataWhenRecive",this.formData);
      });

      this.subscription = this.sharingData.submitFormComponent.subscribe(fromName=> {
        if(fromName){
          this.submitForm();
        }
      });
    },100)

  }
  ngOnDestroy(){
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
