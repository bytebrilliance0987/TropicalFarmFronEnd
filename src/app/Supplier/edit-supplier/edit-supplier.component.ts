import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { supplierCreationDTO, supplierDTO, supplierEditDTO } from '../supplier.module';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {

  constructor(private router: Router , private activatedRoute: ActivatedRoute, private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.editAction();
  }

  model: supplierDTO | any;

  editAction(): any{
    this.activatedRoute.params.subscribe(params => {
      this.supplierService.getSupplierbyID(params.id).subscribe(supplier =>{
        this.model = supplier;
      });
    });
  }

  saveChanges(supplierCreationDTO: supplierCreationDTO){

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
       
      if (result.isConfirmed) {
        try {
          this.supplierService.edit(this.model.supplierID, supplierCreationDTO).subscribe(() =>{
            this.router.navigate(['/supplier']);
          });
        } catch (error) {
          Swal.fire(
            'The Internet?',
            'That thing is still around?',
            'question'
          )
        }
        Swal.fire('Saved!', 'Your changes are successfully updated now!', 'success');
      } else if (result.isDenied) {
        this.router.navigate(['/supplier']);
        Swal.fire('Changes are not updated!', '', 'info')
      }
    })
  }
}
