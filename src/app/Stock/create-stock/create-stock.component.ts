import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { stockCreationDTO } from '../stock.module';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent implements OnInit {

  constructor(private router: Router, private stockService: StockService) { }

  ngOnInit(): void {
  }

  saveChanges(stockCreationDTO: stockCreationDTO){

    try {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'New stock has been added successfully!',
        showConfirmButton: false,
        timer: 1500
      });
      this.stockService.create(stockCreationDTO).subscribe(() =>{
        this.router.navigate(['/stock']);
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
