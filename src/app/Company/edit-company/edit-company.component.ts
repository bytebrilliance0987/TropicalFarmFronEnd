import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { companyCreationDTO, companyDTO } from '../company.module';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private companyService: CompanyService) { }

  model!: companyDTO;

  ngOnInit(): void {
    this.editAction();
  }

  editAction(): void{
    this.activatedRoute.params.subscribe(params =>{
      this.companyService.getByID(params.id).subscribe((company: companyDTO) =>{
        this.model = company;
        console.log(this.model);
      })
    })
  }

  saveChanges(companyCreationDTO: companyCreationDTO): any{
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
       
      if (result.isConfirmed) {
        try {
          this.companyService.edit(this.model.companyID , companyCreationDTO).subscribe(() =>{
            console.log(companyCreationDTO);
            this.router.navigate(['/company']);
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
        this.router.navigate(['/company']);
        Swal.fire('Changes are not updated!', '', 'info')
      }
    })
  }
}
