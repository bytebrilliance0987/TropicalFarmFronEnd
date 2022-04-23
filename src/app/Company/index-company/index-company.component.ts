import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { companyDTO } from '../company.module';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-index-company',
  templateUrl: './index-company.component.html',
  styleUrls: ['./index-company.component.css']
})
export class IndexCompanyComponent implements OnInit {

  constructor(private compnayService: CompanyService) { }

  ngOnInit(): void {
    this.DisplayAllCompanies();
  }

  searchKey: any;

  DisplayAllCompanies(): void{
    try {
      this.compnayService.getAllCompanies().subscribe((company: companyDTO[]) => {
        console.log(company);
        this.viewcompany = company;
      })
    } catch (error) {
      console.log(error);
    }
  }

  searchClear(): void{
    this.searchKey = "";
  }

  DeleteCompany(id: number): void{
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
        this.compnayService.delete(id).subscribe(() =>{
          this.DisplayAllCompanies();
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

  viewcompany: companyDTO[]=[];

  columnsToDisplay: string[] = ['CompanyName', 'CompanyType', 'PhoneNumber', 'AddressNO', 'FirstAddressLine', 'SecondAddressLine', 'City', 'State', 'ZipPostalCode', 'Country', 'AddedDate', 'Addedtime', 'Actions'];

  p: number = 1;
}
