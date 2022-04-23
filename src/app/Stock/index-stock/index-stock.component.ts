import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { stockDTO } from '../stock.module';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-index-stock',
  templateUrl: './index-stock.component.html',
  styleUrls: ['./index-stock.component.css']
})
export class IndexStockComponent implements OnInit {

  constructor(private stockServices: StockService) { }

  ngOnInit(): void {
    this.DisplayAllStocks();
  }

  searchKey: any;

  DisplayAllStocks(): void{
    this.stockServices.getAllStocks().subscribe((stock: stockDTO[]) => {
      console.log(stock);
      this.viewstock = stock;
    });
  }

  searchClear(): void{
    this.searchKey = "";
  }

  DeleteStock(id: number): void{
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
        this.stockServices.delete(id).subscribe(() =>{
          this.DisplayAllStocks();
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  viewstock: stockDTO[]=[];
  columnsToDisplay: string[] = ['PlaceName', 'AddressNO', 'FirstAddressLine', 'SecondAddressLine', 'City', 'ZipPostalCode', 'District', 'AddedDate', 'Addedtime', 'Actions'];

  p: number = 1;
}
