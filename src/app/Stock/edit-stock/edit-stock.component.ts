import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { stockCreationDTO, stockDTO } from '../stock.module';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private stockService: StockService) { }

  ngOnInit(): void {
    this.editAction();
  }

  model: stockDTO | any;

  editAction(): any{
    this.activatedRoute.params.subscribe(params =>{
      this.stockService.getStockbyID(params.id).subscribe((stock: any) =>{
        this.model = stock;
      })
    })
  }

  saveChanges(stockCreationDTO: stockCreationDTO): any{
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
       
      if (result.isConfirmed) {
        try {
          this.stockService.edit(this.model.stockID, stockCreationDTO).subscribe(() =>{
            console.log(stockCreationDTO);
            this.router.navigate(['/stock']);
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
        this.router.navigate(['/stock']);
        Swal.fire('Changes are not updated!', '', 'info')
      }
    })
  }

}
