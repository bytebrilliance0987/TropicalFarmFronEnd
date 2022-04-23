import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { companyCreationDTO, companyDTO } from './company.module';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

  private apiURL = environment.apiURL + 'Companies';

  getAllCompanies(): Observable<companyDTO[]>{
    return this.httpClient.get<companyDTO[]>(this.apiURL);
  }

  getByID(id: number): Observable<companyDTO>{
    return this.httpClient.get<companyDTO>(`${this.apiURL}/${id}`);
  }

  create(companyCreationDTO: companyCreationDTO): any{
    return this.httpClient.post(this.apiURL, companyCreationDTO);
  }

  edit(id: number, companyCreationDTO: companyCreationDTO): any{
    return this.httpClient.put(`${this.apiURL}/${id}`, companyCreationDTO);
  }

  delete(id: number): any{
    return this.httpClient.delete<companyDTO>(`${this.apiURL}/${id}`);
  }
}
