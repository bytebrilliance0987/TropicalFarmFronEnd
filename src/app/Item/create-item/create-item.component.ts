import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { itemCreationDTO } from '../Item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  constructor(private router: Router, private itemService: ItemService) { }

  ngOnInit(): void {
  }

  saveChanges(itemCreationDTO: itemCreationDTO): void{
    try {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'New item has been added successfully!',
        showConfirmButton: false,
        timer: 1500
      });
      this.itemService.create(itemCreationDTO).subscribe(()=>{
        console.log(itemCreationDTO);
        this.router.navigate(['/item']);
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
