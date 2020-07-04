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

  submitForm() {
    this.form.onSubmit(null);
    this.formData.isValidForm = this.form.valid;
    this.sharingData.setFormData(this.formData);
  }


  ngOnInit(): void {
    //console.log("formDataOnInit",this.formData);
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
    }, 100)

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
