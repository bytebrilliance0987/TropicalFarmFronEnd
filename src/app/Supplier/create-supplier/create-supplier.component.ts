import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { supplierCreationDTO } from '../supplier.module';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {

  constructor(private router: Router, private supplierService: SupplierService) { }

  ngOnInit(): void {
  }

  saveChanges(supplierCreationDTO: supplierCreationDTO): void{

    try {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'New supplier has been added successfully!',
        showConfirmButton: false,
        timer: 1500
      });
      this.supplierService.create(supplierCreationDTO).subscribe(() =>{
        this.router.navigate(['/supplier']);
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
