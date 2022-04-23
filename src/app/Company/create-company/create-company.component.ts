import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { companyCreationDTO } from '../company.module';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  saveChanges(companyCreationDTO: companyCreationDTO){
    try {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'New company has been added successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      this.companyService.create(companyCreationDTO).subscribe(() =>{
        this.router.navigate(['/company']);
      });
    } catch (error) {
      Swal.fire(
        'The Internet?',
        'That thing is still around?',
        'question'
      )
    }
  }

}
