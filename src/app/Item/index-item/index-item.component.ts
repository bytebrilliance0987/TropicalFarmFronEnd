import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { companyDTO } from 'src/app/Company/company.module';
import { CompanyService } from 'src/app/Company/company.service';
import { stockDTO } from 'src/app/Stock/stock.module';
import { StockService } from 'src/app/Stock/stock.service';
import { supplierDTO } from 'src/app/Supplier/supplier.module';
import { SupplierService } from 'src/app/Supplier/supplier.service';
import Swal from 'sweetalert2';
import { itemCreationDTO, itemDTO, itemSellDTO } from '../Item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-index-item',
  templateUrl: './index-item.component.html',
  styleUrls: ['./index-item.component.css']
})
export class IndexItemComponent implements OnInit {

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private itemService : ItemService, private supplierService: SupplierService, private stockService: StockService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.DisplayAllItemsInStock();
  }

  searchKey: any;

  date: Date = new Date();
  soldDT: string = formatDate(this.date, 'EEEE, MMMM d, y, h:mm:ss a zzzz', 'en-US').toString();
  sM: string = this.date.toLocaleString('default', { month: 'long' }).toString();
  sY: string = this.date.toLocaleString('default', { year: 'numeric' }).toString();

  model!: itemSellDTO;
  supplier!: supplierDTO;
  stock!: stockDTO;
  company!: companyDTO;

  DisplayAllItemsInStock(): any{
    try {
      this.itemService.getAllItemsInStock().subscribe((itemsinstock: itemDTO[]) => {
        this.viewitems = itemsinstock;
      })
    } catch (error) {
      console.log(error);
    }
  }

  searchClear(): void{
    this.searchKey = "";
  }

  viewsupplier(id: number): void{
    try {
      this.activatedRoute.params.subscribe(() =>{
        this.supplierService.getSupplierbyID(id).subscribe((supplier: supplierDTO) =>{
          this.supplier = supplier;
          Swal.fire({
            title: 'Supplier of this item',
            imageUrl: supplier.profilePicture,
            text: 'This item supplied by ' + supplier.firstName + ' ' + supplier.lastName + ' and contact now via ' + supplier.phoneNumber + ' or email to ' + supplier.email,
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Supplier',
            footer: '<a href="mailto:copy and paste supplier email here that item provided">Open mail app</a>'
          })
        })
      })
    } catch (error) {
      console.log(error);
    }
  }

  viewstock(id: number): void{
    try {
      this.activatedRoute.params.subscribe(() =>{
        this.stockService.getStockbyID(id).subscribe((stock: stockDTO) =>{
          this.stock = stock;
          Swal.fire({
            title: 'Stock',
            imageUrl: 'https://media0.giphy.com/media/UPwElWTjo7Bf8SJNFm/giphy.gif',
            text: 'This item now available at ' + stock.placeName + ' in ' + stock.city,
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Stock',
            footer: '<a href="https://www.google.com/maps/place/" target="_blank">Open map</a>'
          })
        })
      })
    } catch (error) {
      console.log(error);
    }
  }

  viewcompany(id: number): void{
    try {
      this.activatedRoute.params.subscribe(() =>{
        this.companyService.getByID(id).subscribe((company: companyDTO) =>{
          this.company = company;
          Swal.fire({
            title: 'Company',
            imageUrl: 'https://cdn.dribbble.com/users/6115813/screenshots/15485578/media/15d38f8db59b1164c2a2fa698262840e.gif',
            text: 'This item prepared for ' + company.companyName + ' in ' + company.country,
            imageAlt: 'Company',
          })
        })
      })
    } catch (error) {
      console.log(error);
    }
  }

  sellNow(id: number, iName: string, sName: string, iType: string, wt: number, bP: number, supID: number, stID: number, cID: number, aDate: string, atime: string){

    Swal.fire({
      imageUrl: 'https://c.tenor.com/WYKoRh1NGPEAAAAd/truck-delivery.gif',
      title: 'Do you want to sell this item?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sell Now',
      denyButtonText: `Don't sell`,
    }).then((result) => {
       
      if (result.isConfirmed) {
        try {
          this.model = {
            itemID: id,
            itemName: iName,
            scientificName: sName,
            itemType: iType,
            weight: wt,
            buyingPrice: bP,
            addedDate: aDate,
            addedtime: atime,
            isSold: true,
            soldDateTime: this.soldDT,
            soldMonth: this.sM,
            soldYear: this.sY,
            supplierID: supID,
            stockID: stID,
            companyID: cID,
          }

          this.itemService.sell(id, this.model).subscribe(() =>{
            console.log(this.model);
            
          })
        } catch (error) {
          Swal.fire(
            'The Internet?',
            'That thing is still around?',
            'question'
          )
          console.log(error);
        }
        Swal.fire('Sold!', 'Your one item has been sold now!', 'success');
        setTimeout (() => {
          window.location.reload();
       }, 1000);
  
      } else if (result.isDenied) {
        Swal.fire('Not Sold!', '', 'info')
      }
    })
  }

  DeleteItem(id: number): void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemService.delete(id).subscribe(() =>{
          this.DisplayAllItemsInStock();
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  @ViewChild(MatTableExporterDirective)
  matTableExporter!: MatTableExporterDirective;

  importAsXlsx(){
    this.matTableExporter.exportTable('xlsx', {fileName:'Tropical Farm Available Items for Google Sheet', sheet: 'Available Items'});
  }

  importAsCSV(){
    this.matTableExporter.exportTable('csv', {fileName:'Tropical Farm Available Items Report', sheet: 'Available Items'});
  }

  importAsJSON(){
    Swal.fire({
      title: 'Warning!',
      text: "Before downloading, make sure you are all done!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Download for QR codes'
    }).then((result) => {
      if (result.isConfirmed) {
    this.matTableExporter.exportTable('json', {fileName:'Tropical Farm Available Items for QR', sheet: 'Available Items'});
        Swal.fire(
          'Downloaded!',
          'Your file has been downloaded!.',
          'success'
        )
      }
    })
  }

  viewitems: itemDTO[]=[];
  columnsToDisplay: string[] = ['ItemID', 'ItemName', 'ScientificName', 'ItemType', 'Weight', 'BuyingPrice', 'AddedDate', 'AddedTime', 'Actions'];

  p: number = 1;
}

