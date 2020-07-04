import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor( private http:HttpClient) {

  }
  payProduct(data:object){
    data["is_new_account"] = Number(data["is_new_account"]);
    data["is_same_address"] = !data["is_same_address"];
    data["is_same_address"] = Number(data["is_same_address"]);
    return this.http.post(`https://developetests.com/api/saveAddress`,data);
  }
}
