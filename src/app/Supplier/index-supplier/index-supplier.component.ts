import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { supplierDTO } from '../supplier.module';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-index-supplier',
  templateUrl: './index-supplier.component.html',
  styleUrls: ['./index-supplier.component.css']
})
export class IndexSupplierComponent implements OnInit {

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.DisplayAllSuppliers();
  }

  searchKey: any;

  DisplayAllSuppliers(): any{
    this.supplierService.getAllSuppliers().subscribe((supplier: supplierDTO[]) =>{
      this.viewsupplier = supplier;
      console.log(supplier);
    })
  }

  searchClear(): void{
    this.searchKey = "";
  }

  DeleteSupplier(id: number): void{
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
        this.supplierService.delete(id).subscribe(() =>{
          this.DisplayAllSuppliers();
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  ViewEmail(name: string, email: string): void{
    Swal.fire({
      title: 'Send Email Now!',
      text: 'Email address of ' + name + ' is ' + ' ' + email,
      imageUrl: 'https://cdn.dribbble.com/users/1613031/screenshots/5509779/dbbl_airplane_v2.gif',
      imageWidth: 550,
      imageHeight: 400,
      imageAlt: '',
      footer: '<a href="mailto:copy and paste here that email address you want" target="_blank">Open mail app</a>'
    })
  }

  viewsupplier: supplierDTO[] = [];
  columnsToDisplay: string[] = ['ProfilePicture', 'NIC', 'FirstName', 'LastName', 'PhoneNumber', 'AddressNO', 'FirstAddressLine', 'SecondAddressLine', 'City', 'District', 'AddedDate', 'Addedtime', 'Actions'];

  p: number = 1;
}
