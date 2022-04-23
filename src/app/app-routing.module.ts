import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GoogleAuthenticationComponent } from './Authentication/google-authentication/google-authentication.component';
import { CreateCompanyComponent } from './Company/create-company/create-company.component';
import { EditCompanyComponent } from './Company/edit-company/edit-company.component';
import { IndexCompanyComponent } from './Company/index-company/index-company.component';
import { IndexDashboardComponent } from './Dashboard/index-dashboard/index-dashboard.component';
import { PageNotFoundComponent } from './Error/page-not-found/page-not-found.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { CreateItemComponent } from './Item/create-item/create-item.component';
import { EditItemComponent } from './Item/edit-item/edit-item.component';
import { IndexItemComponent } from './Item/index-item/index-item.component';
import { SoldItemComponent } from './Item/sold-item/sold-item.component';
import { CreateStockComponent } from './Stock/create-stock/create-stock.component';
import { EditStockComponent } from './Stock/edit-stock/edit-stock.component';
import { IndexStockComponent } from './Stock/index-stock/index-stock.component';
import { CreateSupplierComponent } from './Supplier/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './Supplier/edit-supplier/edit-supplier.component';
import { IndexSupplierComponent } from './Supplier/index-supplier/index-supplier.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: 'login', component: GoogleAuthenticationComponent},
  {path: 'dashboard', component: IndexDashboardComponent},

  {path: 'item', component: IndexItemComponent},
  {path: 'item/addnew', component: CreateItemComponent},
  {path: 'item/sold', component: SoldItemComponent},
  {path: 'item/edit/:id', component: EditItemComponent},
  
  {path: 'supplier', component: IndexSupplierComponent},
  {path: 'supplier/addnew', component: CreateSupplierComponent},
  {path: 'supplier/edit/:id', component: EditSupplierComponent},

  {path: 'stock', component: IndexStockComponent},
  {path: 'stock/addnew', component: CreateStockComponent},
  {path: 'stock/edit/:id', component: EditStockComponent},

  {path: 'company', component: IndexCompanyComponent},
  {path: 'company/addnew', component: CreateCompanyComponent},
  {path: 'company/edit/:id', component: EditCompanyComponent},

  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
