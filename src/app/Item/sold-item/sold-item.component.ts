import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { companyDTO } from 'src/app/Company/company.module';
import { CompanyService } from 'src/app/Company/company.service';
import { stockDTO } from 'src/app/Stock/stock.module';
import { StockService } from 'src/app/Stock/stock.service';
import { supplierDTO } from 'src/app/Supplier/supplier.module';
import { SupplierService } from 'src/app/Supplier/supplier.service';
import Swal from 'sweetalert2';
import { itemSellDTO, itemDTO } from '../Item.model';
import { ItemService } from '../item.service';
import { MatTableExporterDirective } from 'mat-table-exporter';

@Component({
  selector: 'app-sold-item',
  templateUrl: './sold-item.component.html',
  styleUrls: ['./sold-item.component.css']
})
export class SoldItemComponent implements OnInit {

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private itemService : ItemService, private supplierService: SupplierService, private stockService: StockService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.DisplayAllSoldItems();
  }

  searchKey: any;

  model!: itemDTO;
  supplier!: supplierDTO;
  stock!: stockDTO;
  company!: companyDTO;

  DisplayAllSoldItems(): any{
    try {
      this.itemService.getAllSoldItems().subscribe((solditems: itemDTO[]) => {
        console.log(solditems);
        this.viewitems = solditems;
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
            text: 'This item sold from ' + stock.placeName + ' in ' + stock.city,
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
            text: 'This item sold to ' + company.companyName + ' in ' + company.country,
            imageAlt: 'Company',
          })
        })
      })
    } catch (error) {
      console.log(error);
    }
  }

  DeleteItem(id: number): void{
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete forver if company reject or destroy your item. Otherwise don't delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete forever!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemService.delete(id).subscribe(() =>{
          this.DisplayAllSoldItems();
        });
        Swal.fire(
          'Deleted!',
          'Your record has been deleted.',
          'success'
        )
      }
    })
  }

       


  @ViewChild(MatTableExporterDirective)
  matTableExporter!: MatTableExporterDirective;

  importAsXlsx(){
    this.matTableExporter.exportTable('xlsx', {fileName:'Tropical Farm Sold Items for Google Sheet', sheet: 'Sold Items'});
  }

  importAsCSV(){
    this.matTableExporter.exportTable('csv', {fileName:'Tropical Farm Sold Items Report', sheet: 'Sold Items'});
  }

  viewitems: itemDTO[]=[];
  columnsToDisplay: string[] = ['ItemID', 'ItemName', 'ItemType', 'Weight', 'SoldDateTime', 'Actions'];

  p: number = 1;
}
