import { Component, OnInit,ViewChild, AfterViewInit,OnDestroy } from '@angular/core';
import {Form, FormControl, NgForm, Validators} from '@angular/forms';
import { SharingDataService } from '../../Services/sharing-data.service'
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit,AfterViewInit,OnDestroy{
  isSameBilling = false;
  formData:object={isValid:false};
  subscription: Subscription;

  @ViewChild("deliveryForm") form: NgForm;

  constructor(private sharingData:SharingDataService) {

  }
  submitForm(){
      this.form.onSubmit(null);
      this.sharingData.setFormData({isValid:this.form.valid});
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.sharingData.setFormData({isValid:this.form.valid});
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
