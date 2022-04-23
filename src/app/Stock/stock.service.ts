import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stockCreationDTO, stockDTO } from './stock.module';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  [x: string]: any;

  constructor(private httpClient: HttpClient) { }

  private apiURL = environment.apiURL + 'Stocks';

  getAllStocks(): Observable<stockDTO[]>{
    return this.httpClient.get<stockDTO[]>(this.apiURL);
  }

  getStockbyID(id: number): Observable<stockDTO>{
    return this.httpClient.get<stockDTO>(`${this.apiURL}/${id}`);
  }

  create(stockCreationDTO: stockCreationDTO): any{
    return this.httpClient.post(this.apiURL, stockCreationDTO);
  }

  edit(id: number, stockCreationDTO: stockCreationDTO): any{
    return this.httpClient.put(`${this.apiURL}/${id}`, stockCreationDTO);
  }

  delete(id: number): any{
    return this.httpClient.delete<stockDTO>(`${this.apiURL}/${id}`);
  }
}
