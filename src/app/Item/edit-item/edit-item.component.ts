import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { itemCreationDTO, itemSellDTO} from '../Item.model';
import { ItemService } from '../item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private itemService: ItemService) { }

  ngOnInit(): void {
    this.editAction();
  }

  model: itemCreationDTO | any

  editAction(): any{
    this.activatedRoute.params.subscribe(params =>{
      this.itemService.getItembyID(params.id).subscribe((item: any) =>{
        this.model = item;
      })
    })
  }

  saveChanges(itemCreationDTO: itemCreationDTO): void{

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
       
      if (result.isConfirmed) {
        try {
          this.itemService.edit(this.model.itemID, itemCreationDTO).subscribe(() =>{
            this.router.navigate(['/item']);
          })
        } catch (error) {
          Swal.fire(
            'The Internet?',
            'That thing is still around?',
            'question'
          )
        }
        Swal.fire('Saved!', 'Your changes are successfully updated now!', 'success');
      } else if (result.isDenied) {
        this.router.navigate(['/item']);
        Swal.fire('Changes are not updated!', '', 'info')
      }
    })
  }

}
