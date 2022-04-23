import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stockCreationDTO } from '../stock.module';

interface District{
  name: string;
}

@Component({
  selector: 'app-form-stock',
  templateUrl: './form-stock.component.html',
  styleUrls: ['./form-stock.component.css']
})
export class FormStockComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup | any;

  ngOnInit(): void {
    this.stockform();
    this.editStock();
  }

  stockform(): void{
    this.form = this.formBuilder.group({
      stockID: [''],
      placeName: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('[a-zA-Z ]+'))]}],
      addressNO: ['', {validators: [Validators.required]}],
      firstAddressLine: ['', {validators: [Validators.required , Validators.minLength(3)]}],
      secondAddressLine: [''],
      city: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('[a-zA-Z ]+'))]}],
      zipPostalCode: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('^[0-9]*$'))]}],
      district: ['', {validators: [Validators.required]}],
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

  editStock(): void{
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }


  GetErrorMessageFieldPlaceName(){
    if(this.form.get('placeName').hasError('required')){
      return 'The place name feild is required!';
    }
    else if(this.form.get('placeName').hasError('minlength')){
      return 'Place name must have at least 3 letters!';
    }
    else if(this.form.get('placeName').hasError('pattern')){
      return 'Place name must have letters only!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldAddressNO(){
    if(this.form.get('addressNO').hasError('required')){
      return 'The address number feild is required!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldFirstAddressLine(){
    if(this.form.get('firstAddressLine').hasError('required')){
      return 'The first address line is required!';
    }
    else if(this.form.get('firstAddressLine').hasError('minlength')){
      return 'first address line must have at least 3 letters!';
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

  GetErrorMessageFieldDistrict(){
    if(this.form.get('district').hasError('required')){
      return 'The district feild is required!';
    }else{
      return '';
    }
  }

  @Output()
  onSaveChanges: EventEmitter<stockCreationDTO> = new EventEmitter<stockCreationDTO>();

  @Input()
  model!: stockCreationDTO | any;

  saveChangesForm(): void{
    this.onSaveChanges.emit(this.form.value)
  }

  clear(): void{
    this.form.reset();
  }

}
