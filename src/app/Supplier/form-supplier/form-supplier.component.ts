import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { supplierCreationDTO } from '../supplier.module';

interface District{
  name: string;
}

@Component({
  selector: 'app-form-supplier',
  templateUrl: './form-supplier.component.html',
  styleUrls: ['./form-supplier.component.css']
})
export class FormSupplierComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup | any;

  ngOnInit(): void {
    this.supplierform();
    this.editSupplier();
  }

  supplierform(): void{
    this.form = this.formBuilder.group({
      supplierID: [''],
      nic: ['', {validators: [Validators.required , Validators.pattern(('^([0-9]{9}[x|X|v|V]|[0-9]{12})$'))]}],
      firstName: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('[a-zA-Z ]+'))]}],
      lastName: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('[a-zA-Z ]+'))]}],
      phoneNumber: ['', {validators: [Validators.required , Validators.minLength(10) , Validators.maxLength(10) , Validators.pattern(('^[0-9]*$'))]}],
      email: ['', {validators: [Validators.required , Validators.email]}],
      addressNO: ['', {validators: [Validators.required]}],
      firstAddressLine: ['', {validators: [Validators.required , Validators.minLength(3)]}],
      secondAddressLine: [''],
      city: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('[a-zA-Z ]+'))]}],
      district: ['', {validators: [Validators.required]}],
      profilePicture: ['']
    })
  }

  district: District[] = [
    {name: 'Ampara'},
    {name: 'Anuradhapura'},
    {name: 'Badulla'},
    {name: 'Batticoloa'},
    {name: 'Colombo'},
    {name: 'Galle'},
    {name: 'Gampaha'},
    {name: 'Hambantota'},
    {name: 'Jaffna'},
    {name: 'Kalutara'},
    {name: 'Kandy'},
    {name: 'Kegalle'},
    {name: 'Kilinochchi'},
    {name: 'Kurunegala'},
    {name: 'Mannar'},
    {name: 'Matale'},
    {name: 'Matara'},
    {name: 'Monaregala'},
    {name: 'Mullaitivu'},
    {name: 'Nuwara Eliya'},
    {name: 'Polonnaruwa'},
    {name: 'Puttalam'},
    {name: 'Rathnapura'},
    {name: 'Trincomalee'},
    {name: 'Vavuniya'},
  ];

  editSupplier(): void{
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  GetErrorMessageFieldNIC(){
    if(this.form.get('nic').hasError('required')){
      return 'The NIC feild is required!';
    }else if(this.form.get('nic').hasError('pattern')){
      return 'This is not like a valid NIC number!';
    }else{
      return '';
    }
  }


  GetErrorMessageFieldFirstName(){
    if(this.form.get('firstName').hasError('required')){
      return 'The first name feild is required!';
    }
    else if(this.form.get('firstName').hasError('minlength')){
      return 'Name must have at least 3 letters!';
    }
    else if(this.form.get('firstName').hasError('pattern')){
      return 'Name must have letters only!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldLastName(){
    if(this.form.get('lastName').hasError('required')){
      return 'The last name feild is required!';
    }
    else if(this.form.get('lastName').hasError('minlength')){
      return 'Name must have at least 3 letters!';
    }
    else if(this.form.get('lastName').hasError('pattern')){
      return 'Name must have letters only!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldPhoneNumber(){
    if(this.form.get('phoneNumber').hasError('required')){
      return 'The phone number feild is required!';
    }else if(this.form.get('phoneNumber').hasError('minlength')){
      return 'Phone number must have 10 numbers!';
    }else if(this.form.get('phoneNumber').hasError('maxlength')){
      return 'Phone number must have 10 numbers!';
    }else if(this.form.get('phoneNumber').hasError('pattern')){
      return 'Phone number is invalid!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldEmail(){
    if(this.form.get('email').hasError('required')){
      return 'The email address is required!';
    }
    else if(this.form.get('email').hasError('email')){
      return 'This is not like a valid email address!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldAddressNO(){
    if(this.form.get('addressNO').hasError('required')){
      return 'The address nnumber is required!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldFirstAddressLine(){
    if(this.form.get('firstAddressLine').hasError('required')){
      return 'The first name feild is required!';
    }
    else if(this.form.get('firstAddressLine').hasError('minlength')){
      return 'This is too short...!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldCity(){
    if(this.form.get('city').hasError('required')){
      return 'The city feild is required!';
    }
    else if(this.form.get('city').hasError('minlength')){
      return 'City must have at least 3 letters!';
    }
    else if(this.form.get('city').hasError('pattern')){
      return 'City must have letters only!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldDistrict(){
    if(this.form.get('district').hasError('required')){
      return 'The district feild is required!';
    }else{
      return '';
    }
  }

  @Output()
  onSaveChanges: EventEmitter<supplierCreationDTO> = new EventEmitter<supplierCreationDTO>();

  @Input()
  model!: supplierCreationDTO | any;

  onImageSelected(image: File){
    this.form.get('profilePicture').setValue(image);
  }

  saveChangesForm(): void{
    this.onSaveChanges.emit(this.form.value)
  }

  clear(): void{
    this.form.reset();
  }

}
