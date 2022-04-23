import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { companyDTO } from 'src/app/Company/company.module';
import { CompanyService } from 'src/app/Company/company.service';
import { stockDTO } from 'src/app/Stock/stock.module';
import { StockService } from 'src/app/Stock/stock.service';
import { supplierDTO } from 'src/app/Supplier/supplier.module';
import { SupplierService } from 'src/app/Supplier/supplier.service';
import Swal from 'sweetalert2';
import { itemCreationDTO } from '../Item.model';
import { ItemService } from '../item.service';

interface Type{
  name: string;
}

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService, private stockService: StockService, private companyService: CompanyService) { }

  form!: FormGroup | any;

  ngOnInit(): void {
    this.itemform();
    this.editItem();
    this.dropdownMenus();
  }

  itemform(): void{
    this.form = this.formBuilder.group({
      itemID: [''],
      itemName: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('[a-zA-Z ]+'))]}],
      scientificName: ['', {validators: [Validators.required , Validators.minLength(3) , Validators.pattern(('[a-zA-Z ]+'))]}],
      itemType: ['', {validators: [Validators.required]}],
      weight: ['', {validators: [Validators.required , Validators.min(0.1) , Validators.pattern(('^[0-9]*(\.[0-9]{1,4})?$'))]}],
      buyingPrice: ['', {validators: [Validators.required , Validators.min(10) , Validators.pattern(('^[0-9]*(\.[0-9]{1,4})?$'))]}],
      isSold: false,
      soldDateTime: ['Not sold yet...'],
      soldMonth: ['Not sold yet...'],
      soldYear: ['Not sold yet...'],
      supplierID: ['', {validators: [Validators.required]}],
      stockID: ['', {validators: [Validators.required]}],
      companyID: ['', {validators: [Validators.required]}]
    })
  }

  editItem(): void{
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  type: Type[] = [
    {name: 'Cut leaves'},
    {name: 'Not Cut leaves'},
    {name: 'Full Cut leaves'},
    {name: 'Plants'},
    {name: 'Pods'},
    {name: 'Seeds'},
    {name: 'Wine'},
    {name: 'Wood'},
    {name: 'Crushed'},
    {name: 'Rolls'},
    {name: 'Shell'},
    {name: 'Strips'},
    {name: 'Xaxim'},
  ];

  dropdownMenus(): void{
    this.supplierDropdownMenu();
    this.stockDropdownMenu();
    this.companykDropdownMenu();
  }

  supplier: supplierDTO[] = [];
  stock: stockDTO[] = [];
  company: companyDTO[] = [];

  supplierDropdownMenu(): void{
    this.supplierService.getAllSuppliers().subscribe((supplier: any) =>{
      this.supplier = supplier;
    })
  }

  stockDropdownMenu(): void{
    this.stockService.getAllStocks().subscribe((stock: any) =>{
      this.stock = stock;
    })
  }

  companykDropdownMenu(): void{
    this.companyService.getAllCompanies().subscribe((company: any) =>{
      this.company = company;
    })
  }


  GetErrorMessageFieldName(){
    if(this.form.get('itemName').hasError('required')){
      return 'The name feild is required!';
    }
    else if(this.form.get('itemName').hasError('minlength')){
      return 'Name must have at least 3 letters!';
    }
    else if(this.form.get('itemName').hasError('pattern')){
      return 'Name must have letters only!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldScientificName(){
    if(this.form.get('scientificName').hasError('required')){
      return 'The scientific name feild is required!';
    }
    else if(this.form.get('scientificName').hasError('minlength')){
      return 'Scientific name must have at least 3 letters!';
    }
    else if(this.form.get('scientificName').hasError('pattern')){
      return 'Scientific name must have letters only!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldItemType(){
    if(this.form.get('itemType').hasError('required')){
      return 'Please select item type of this item!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldWeight(){
    if(this.form.get('weight').hasError('required')){
      return 'The item weight is required!';
    }else if(this.form.get('weight').hasError('pattern')){
      return 'This is not like a weight!';
    }else if(this.form.get('weight').hasError('min')){
      return 'weight must have real value!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldBuyingPrice(){
    if(this.form.get('buyingPrice').hasError('required')){
      return 'The buying price is required!';
    }else if(this.form.get('buyingPrice').hasError('pattern')){
      return 'This is not like a actual price!';
    }else if(this.form.get('buyingPrice').hasError('min')){
      return 'Give valuble price to the supplier!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldSupplier(){
    if(this.form.get('supplierID').hasError('required')){
      return 'Please select supplier of this item!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldStock(){
    if(this.form.get('stockID').hasError('required')){
      return 'Please select stock of this item!';
    }else{
      return '';
    }
  }

  GetErrorMessageFieldCompany(){
    if(this.form.get('companyID').hasError('required')){
      return 'Please select buying company of this item before sell!';
    }else{
      return '';
    }
  }

  @Output()
  onSaveChanges: EventEmitter<itemCreationDTO> = new EventEmitter<itemCreationDTO>();

  @Input()
  model!: itemCreationDTO | any;

  saveChangesForm(): void{
    this.onSaveChanges.emit(this.form.value);
  }

  clear(): void{
    this.form.reset();
  }
}
