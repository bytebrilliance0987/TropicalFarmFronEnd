import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { companyCreationDTO, companyDTO } from '../company.module';

interface Type{
  name: string
}

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.css']
})
export class FormCompanyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup | any;

  ngOnInit(): void {
    this.companyform();
    this.editCompany();
  }

  companyform(): void{
    this.form = this.formBuilder.group({
      companyID: [''],
      companyName: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('[a-zA-Z ]+'))]}],
      companyType: ['', {validators: [Validators.required]}],
      phoneNumber: ['', {validators: [Validators.required , Validators.minLength(10)]}],
      email: ['', {validators: [Validators.required , Validators.email]}],
      addressNO: ['', {validators: [Validators.required]}],
      firstAddressLine: ['', {validators: [Validators.required , Validators.minLength(3)]}],
      secondAddressLine: [''],
      city: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('[a-zA-Z ]+'))]}],
      state: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('[a-zA-Z ]+'))]}],
      zipPostalCode: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('^[0-9]*$'))]}],
      country: ['', {validators: [Validators.required]}],
      website: ['', {validators: [Validators.required , Validators.pattern(('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'))]}],

    })
  }

  type: Type[] = [
    {name: "Export Only"},
    {name: "Export Only | Retail"},
    {name: "Export Only | Bulk"},
    {name: "Import Only"},
    {name: "Import Only | Retail"},
    {name: "Import Only | Bulk"},
    {name: "Export and Import"},
    {name: "Export and Import | Retail"},
    {name: "Export and Import | Bulk"},
    {name: "Partnership"}
]

  editCompany(): void{
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }


  GetErrorMessageFieldCompanyName(){
    if(this.form.get('companyName').hasError('required')){
      return 'The company name feild is required!';
    }
    else if(this.form.get('companyName').hasError('minlength')){
      return 'Company name must have at least 3 letters!';
    }
    else if(this.form.get('companyName').hasError('pattern')){
      return 'Company name must have letters only!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldCompanyType(){
    if(this.form.get('companyType').hasError('required')){
      return 'The company type feild is required!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldPhoneNumber(){
    if(this.form.get('phoneNumber').hasError('required')){
      return 'The phone number feild is required!';
    }else if(this.form.get('phoneNumber').hasError('minlength')){
      return 'Phone number must have at least 10 numbers!';
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

  GetErrorMessageFieldState(){
    if(this.form.get('state').hasError('required')){
      return 'The state feild is required!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldZipPostalCode(){
    if(this.form.get('zipPostalCode').hasError('required')){
      return 'The zip/postal code is required!';
    }
    else if(this.form.get('zipPostalCode').hasError('minlength')){
      return 'Zip/postal code must have at least 3 numbers!';
    }
    else if(this.form.get('zipPostalCode').hasError('pattern')){
      return 'Zip/postal code must have numbers only!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldCountry(){
    if(this.form.get('country').hasError('required')){
      return 'The country is required!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldWebsite(){
    if(this.form.get('website').hasError('required')){
      return 'The website feild is required!';
    }
    else if(this.form.get('website').hasError('pattern')){
      return 'This website is currently unavailable or invalid url!';
    }else{
      return '';
    }
  }

  @Output()
  onSaveChanges: EventEmitter<companyCreationDTO> = new EventEmitter<companyCreationDTO>();

  @Input()
  model!: companyCreationDTO | any;

  saveChangesForm(): void{
    this.onSaveChanges.emit(this.form.value);
  }

  clear(): void{
    this.form.reset();
  }

}
