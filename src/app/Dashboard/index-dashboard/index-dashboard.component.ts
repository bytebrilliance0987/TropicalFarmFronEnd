import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/Authentication/security.service';
import { companyDTO } from 'src/app/Company/company.module';
import { CompanyService } from 'src/app/Company/company.service';
import { itemDTO, ItemInStockWeightDTO, ItemSoldWeightDTO, ItemTotalBuyingPriceDTO } from 'src/app/Item/Item.model';
import { ItemService } from 'src/app/Item/item.service';
import { stockDTO } from 'src/app/Stock/stock.module';
import { StockService } from 'src/app/Stock/stock.service';
import { supplierDTO } from 'src/app/Supplier/supplier.module';
import { SupplierService } from 'src/app/Supplier/supplier.service';

@Component({
  selector: 'app-index-dashboard',
  templateUrl: './index-dashboard.component.html',
  styleUrls: ['./index-dashboard.component.css']
})
export class IndexDashboardComponent implements OnInit {

  constructor(private itemService: ItemService, private stockServices: StockService, private supplierService: SupplierService, private compnayService: CompanyService) { }

  ngOnInit(): void {
    this.DisplayAllItemsInStock();
    this.DisplayAllSoldItems();
    this.DisplayInStockWeight();
    this.DisplaySoldWeight();
    this.DisplayTotalBuyingPrice();
    this.DisplayAllSuppliers();
    this.DisplayAllStocks();
    this.DisplayAllCompanies();
  }

  def_countOfItemsinStocks: number | any;

  date: Date = new Date();

  ThisYear(): string{
    return this.date.toLocaleString('default', { year: 'numeric' }).toString();
  }

  ThisMonth(): string{
    return this.date.toLocaleString('en-us', { month: 'long' }).toString();
  }

  itemsinstock!: itemDTO[];
  solditems!: itemDTO[];
  supplier!: supplierDTO[];
  stock!: stockDTO[];
  company!: companyDTO[];
  InStockWeight!: ItemInStockWeightDTO;
  SoldWeight!: ItemSoldWeightDTO;
  TotalBuyingPrice!: ItemTotalBuyingPriceDTO;

  DisplayAllItemsInStock(): any{
    try {
      this.itemService.getAllItemsInStock().subscribe((itemsinstock: itemDTO[]) => {
        this.itemsinstock = itemsinstock;
      })
    } catch (error) {
    }
  }

  DisplayAllSoldItems(): any{
    try {
      this.itemService.getAllSoldItems().subscribe((solditems: itemDTO[]) => {
        this.solditems = solditems;
      })
    } catch (error) {
    }
  }

  
  DisplayInStockWeight(): void{
    this.itemService.getInStockWeight().subscribe((InStockWeight: ItemInStockWeightDTO) => {
      this.InStockWeight = InStockWeight;
    })
  }

  DisplaySoldWeight(): void{
    this.itemService.getSoldWeight().subscribe((SoldWeight: ItemSoldWeightDTO) => {
      this.SoldWeight = SoldWeight;
    })
  }

  DisplayTotalBuyingPrice(): void{
    this.itemService.getTotalBuyingPrice().subscribe((TotalBuyingPrice: ItemTotalBuyingPriceDTO) => {
      this.TotalBuyingPrice = TotalBuyingPrice;
    })
  }

  DisplayAllCompanies(): void{
    try {
      this.compnayService.getAllCompanies().subscribe((company: companyDTO[]) => {
        this.company = company;
      })
    } catch (error) {
    }
  }

  DisplayAllStocks(): void{
    this.stockServices.getAllStocks().subscribe((stock: stockDTO[]) => {
      this.stock = stock;
    })
  }

  DisplayAllSuppliers(): void{
    this.supplierService.getAllSuppliers().subscribe((supplier: supplierDTO[]) =>{
      this.supplier = supplier;
    })
  }

  countOfItemsinStocks(): number{
    return this.itemsinstock.length;
  }

  totalAvailableWeight(): any{
    return this.InStockWeight;
  }

  totalSoldWeight(): any{
    return this.SoldWeight;
  }

  totalTotalBuyingPrice(): any{
    return this.TotalBuyingPrice;
  }

  countOfSoldItems(): number{
    return this.solditems.length;
  }

  countOfSuppliers(): number{
    return this.supplier.length;
  }

  countOfStocks(): number{
    return this.stock.length;
  }

  countOfCompanies(): number{
    return this.company.length;
  }

}
