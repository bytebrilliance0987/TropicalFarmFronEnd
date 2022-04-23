import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { itemCreationDTO, itemDTO, ItemInStockWeightDTO, itemSellDTO, ItemSoldWeightDTO, ItemTotalBuyingPriceDTO } from './Item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  model: { itemName: string; scientificName: string; itemType: string; weight: number; buyingPrice: number; addedDate: string; addedtime: string; isSold: boolean; soldDateTime: string; soldMonth: string; soldYear: string; supplierID: number; stockID: number; companyID: number; } | any;

  date: Date = new Date();
  soldDT: string = formatDate(this.date, 'EEEE, MMMM d, y, h:mm:ss a zzzz', 'en-US').toString();
  sM: string = this.date.toLocaleString('default', { month: 'long' }).toString();
  sY: string = this.date.toLocaleString('default', { year: 'numeric' }).toString();
  
  constructor(private httpClient: HttpClient) { }

  private apiURL = environment.apiURL + 'Items';
  private apiURL_InStock = this.apiURL + '/InStock';
  private apiURL_Sold = this.apiURL + '/Sold';
  private apiURL_InStockWeight = this.apiURL + '/InStockWeight';
  private apiURL_SoldWeight = this.apiURL + '/SoldWeight';
  private apiURL_TotalBuyingPrice = this.apiURL + '/TotalBuyingPrice';

  getAllItemsInStock(): Observable<itemDTO[]>{
    return this.httpClient.get<itemDTO[]>(this.apiURL_InStock);
  }

  getAllSoldItems(): Observable<itemDTO[]>{
    return this.httpClient.get<itemDTO[]>(this.apiURL_Sold);
  }

  getInStockWeight(): Observable<ItemInStockWeightDTO>{
    return this.httpClient.get<ItemInStockWeightDTO>(this.apiURL_InStockWeight);
  }

  getSoldWeight(): Observable<ItemSoldWeightDTO>{
    return this.httpClient.get<ItemSoldWeightDTO>(this.apiURL_SoldWeight);
  }

  getTotalBuyingPrice(): Observable<ItemTotalBuyingPriceDTO>{
    return this.httpClient.get<ItemTotalBuyingPriceDTO>(this.apiURL_TotalBuyingPrice);
  }

  getItembyID(id: number): Observable<itemDTO>{
    return this.httpClient.get<itemDTO>(`${this.apiURL}/${id}`);
  }

  create(itemCreationDTO: itemCreationDTO): any{
    return this.httpClient.post(this.apiURL, itemCreationDTO);
  }

  edit(id: number, itemCreationDTO: itemCreationDTO): any{
    return this.httpClient.put(`${this.apiURL}/${id}`, itemCreationDTO);
  }

  sell(id: number, itemSellDTO: itemSellDTO): any{
    return this.httpClient.put(`${this.apiURL}/${id}`, itemSellDTO);
  }

  delete(id: number): any{
    return this.httpClient.delete<itemDTO>(`${this.apiURL}/${id}`);
  }
}
