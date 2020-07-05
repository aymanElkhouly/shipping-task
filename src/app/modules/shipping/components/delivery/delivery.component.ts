import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SharingDataService} from '../../Services/sharing-data.service'
import {Subscription} from 'rxjs';
import {FormData} from '../../consts/form-data';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit, AfterViewInit, OnDestroy {
  passwordPattern: string
  subscription: Subscription;
  formData = new FormData();

  //** To access template Ref of Form **//
  @ViewChild("deliveryForm") form: NgForm;

  constructor(private sharingData: SharingDataService) {
    this.passwordPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}";
  }

  passWordValidator(){
    if(this.formData.password !== this.formData.password_confirmation){
      //** set custom error to form control **//
      this.form.controls.accountConfirmPassword.setErrors({passworderror:true});
    }
    else if (this.formData.password === this.formData.password_confirmation){
      //** remove password error & update form control validation **//
      this.form.controls.accountConfirmPassword.setErrors({});
      this.form.controls.accountConfirmPassword.clearValidators();
      this.form.controls.accountConfirmPassword.updateValueAndValidity();
    }
  }

  submitForm() {
    this.form.onSubmit(null);
    this.formData.isValidForm = this.form.valid;
    this.sharingData.setFormData(this.formData);
  }

  resetForm(){
    //** reset Hole Form & Set some formControls to Initial Value **//
    let defaultFormControls = {
      createAccount: false,
      shippingIsSameBilling: true,
    }
    this.form.resetForm(defaultFormControls);
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      //** using rxjs subject behavior with service to share data between component **//
      this.subscription = this.sharingData.currentFormData.subscribe(data => {
        this.formData = data;
      });

      //** using rxjs subject behavior with service to able submit Form  from outside (Parent) **//
      this.subscription = this.sharingData.submitFormComponent.subscribe(fromName => {
        if (fromName) {
          this.submitForm();
        }
      });

      //** using rxjs subject behavior with service to able ReSetForm  from outside (Parent) **//
      this.subscription = this.sharingData.resetFormObserv.subscribe(state => {
        if (state) {
          this.resetForm();
        }
      });


    }, 100)

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
