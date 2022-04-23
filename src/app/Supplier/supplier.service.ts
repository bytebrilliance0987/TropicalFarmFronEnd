import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { supplierCreationDTO, supplierDTO } from './supplier.module';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private httpClient: HttpClient) { }

  private apiURL = environment.apiURL + 'Suppliers';

  getAllSuppliers(): Observable<supplierDTO[]>{
    return this.httpClient.get<supplierDTO[]>(this.apiURL);
  }

  getSupplierbyID(id: number): Observable<supplierDTO>{
    return this.httpClient.get<supplierDTO>(`${this.apiURL}/${id}`);
  }

  create(supplierCreationDTO: supplierCreationDTO): any{
    return this.httpClient.post(this.apiURL, this.buildFormData(supplierCreationDTO));
  }

  edit(id: number, supplierCreationDTO: supplierCreationDTO): any{
    return this.httpClient.put(`${this.apiURL}/${id}`, this.buildFormData(supplierCreationDTO));
  }

  delete(id: number){
    return this.httpClient.delete<supplierDTO>(`${this.apiURL}/${id}`);
  }

  private buildFormData(supplierCreationDTO: supplierCreationDTO): FormData{
    const createNew = new FormData();

    try {

        createNew.append('nic', supplierCreationDTO.nic);
        createNew.append('firstName', supplierCreationDTO.firstName);
        createNew.append('lastName', supplierCreationDTO.lastName);
        createNew.append('phoneNumber', supplierCreationDTO.phoneNumber);
        createNew.append('email', supplierCreationDTO.email);
        createNew.append('addressNO', supplierCreationDTO.addressNO);
        createNew.append('firstAddressLine', supplierCreationDTO.firstAddressLine);

        if(supplierCreationDTO.secondAddressLine){
          createNew.append('secondAddressLine', supplierCreationDTO.secondAddressLine);
        }
        
        createNew.append('city', supplierCreationDTO.city);
        createNew.append('district', supplierCreationDTO.district);
        createNew.append('profilePicture', supplierCreationDTO.profilePicture);

    } catch (error) {
      console.log("Error found on supplier service. Can't create aupplier");
    }

    return createNew;
  }
}
