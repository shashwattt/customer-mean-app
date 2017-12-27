import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'customer-create',
  templateUrl: './customerCreate.comp.html',
  styleUrls: ['./customerCreate.comp.css']
})

export class CustomerCreate implements OnInit{
  
  model = {
    fullName:'',
    phoneNumber: '',
    mobileNumber: '',
    dob: '',
    email: '',
    flat: '',
    street: '',
    state: '',
    pincode: '',
    addressList :[],
    _id:''
  }
  models = '';

  constructor(private _service:CustomerService,private _router: Router, private _snackbar: MatSnackBar){}
  customerForm: FormGroup;
  fullName: FormControl; 
  phoneNumber: FormControl;
  mobileNumber: FormControl;
  dob: FormControl;
  email: FormControl;
  flat: FormControl;
  street: FormControl;
  state: FormControl;
  pincode: FormControl;


  ngOnInit() {
    this.createFormControls();
    this.createForm();
    let record = this._service.customerServiceData;
    if(record && record._id){
      this.model._id = record._id;
      this.model.fullName = record.Name;
      this.model.email = record.Email;
      this.model.mobileNumber = record.Mobile;
      this.model.phoneNumber = record.Phone;
      this.model.dob = record.DOB;
      record.Addresses.forEach(item =>{
        let newAddress = {
          _id : item._id,
          flat : item.Flat,
          street : item.Street,
          state: item.State,
          pincode: item.Pincode
        }
        this.model.addressList.push(newAddress);
      });
    };
  }

  createFormControls() { 
    this.fullName = new FormControl('', Validators.required);
    this.phoneNumber = new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.minLength(11)
    ]);
    this.mobileNumber = new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10)
    ]);
    this.dob = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.flat = new FormControl('', Validators.required);
    this.street = new FormControl('', Validators.required);
    this.state = new FormControl('', Validators.required);
    this.pincode = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)
    ]);

  }
  createForm() { 
    this.customerForm = new FormGroup({
      fullName :this.fullName,
      phoneNumber: this.phoneNumber,
      mobileNumber: this.mobileNumber,
      dob:this.dob,
      email: this.email,
      flat: this.flat,
      street: this.street,
      state: this.state,
      pincode: this.pincode
    });
  }

  numberValidation(event){
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  onSubmitForm(form){
    var data = form.value;
    console.log(data)
    console.log(JSON.stringify(data));
    data.address = [];
    if(this.flat.valid && this.street.valid && this.state.valid && this.pincode.valid){
      data.address.push({
        flat: data.flat,
        street:data.street,
        state:data.state,
        pincode:data.pincode
      })
    }
    data._id = this.model._id;
    if(this.model.addressList.length>0){
      data.address = data.address.concat(this.model.addressList)
    }

    this._service.addCustomer(data)
      .then((resp) => {
        if(resp.status=='success'){
          let msg = (this.model._id != '')?'updated customer information':'added new customer'
          this._snackbar.open("Sussessfully "+msg, '', {
            duration: 4000,
          });
          this._router.navigate(['']);
        }
        console.log(resp)
      })
      .catch((err) => {
        this._snackbar.open("Failed to add new customer, Email id already used", '', {
          duration: 4000,
        });
      });
  }

  cancelCreate(){
    this._router.navigate(['']);
  }

  addAdress(){
    this.models = JSON.stringify(this.model);
    let newAddress = {
      flat : this.model.flat,
      street : this.model.street,
      state: this.model.state,
      pincode: this.model.pincode, 
      _id:''
    }

    this.model.addressList.push(newAddress);
    this.pincode.setValue("");
    this.pincode.markAsPristine();
    this.pincode.markAsUntouched();
  
    this.state.setValue("");
    this.state.markAsPristine();
    this.state.markAsUntouched();

    this.street.setValue("");
    this.street.markAsPristine();
    this.street.markAsUntouched();
    
    this.flat.setValue("");
    this.flat.markAsPristine();
    this.flat.markAsUntouched();
    


  }

  determineDisable(){
    if(this.fullName.valid && this.phoneNumber.valid && 
      this.mobileNumber.valid && this.dob.valid && this.email.valid
      && this.model.addressList.length>0){
        return false
      }else if(this.customerForm.valid){
        return false
      }else{
        return true;
      }

  }
}