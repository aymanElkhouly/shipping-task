export class FormData {
  isValidForm:boolean;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  country: string;
  postal_code: number;
  is_same_address: number;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_postal_code: number;
  is_new_account: number;
  email: string;
  password: string;
  password_confirmation: string;

  constructor() {
    this.isValidForm = false;
    this.first_name = "";
    this.last_name = "";
    this.address_1 = "";
    this.address_2 = "";
    this.city = "";
    this.state = "";
    this.country = "";
    this.postal_code = null;
    this.is_same_address = 1;
    this.shipping_first_name = "";
    this.shipping_last_name = "";
    this.shipping_address_1 = "";
    this.shipping_address_2 = "";
    this.shipping_city = "";
    this.shipping_state = "";
    this.shipping_country = "";
    this.shipping_postal_code = null;
    this.is_new_account = 0;
    this.email = "";
    this.password = "";
    this.password_confirmation = "";

  }

}
