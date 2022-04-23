import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './Material/material.module';

import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexSupplierComponent } from './Supplier/index-supplier/index-supplier.component';
import { CreateSupplierComponent } from './Supplier/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './Supplier/edit-supplier/edit-supplier.component';
import { FormSupplierComponent } from './Supplier/form-supplier/form-supplier.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './Error/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexDashboardComponent } from './Dashboard/index-dashboard/index-dashboard.component';
import { DarkModeToggleComponent } from './Utilities/dark-mode-toggle/dark-mode-toggle.component';
import { IndexItemComponent } from './Item/index-item/index-item.component';
import { EditItemComponent } from './Item/edit-item/edit-item.component';
import { CreateItemComponent } from './Item/create-item/create-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormItemComponent } from './Item/form-item/form-item.component';
import { InputImageComponent } from './Utilities/input-image/input-image.component';
import { IndexStockComponent } from './Stock/index-stock/index-stock.component';
import { CreateStockComponent } from './Stock/create-stock/create-stock.component';
import { EditStockComponent } from './Stock/edit-stock/edit-stock.component';
import { FormStockComponent } from './Stock/form-stock/form-stock.component';
import { IndexCompanyComponent } from './Company/index-company/index-company.component';
import { CreateCompanyComponent } from './Company/create-company/create-company.component';
import { EditCompanyComponent } from './Company/edit-company/edit-company.component';
import { FormCompanyComponent } from './Company/form-company/form-company.component';
import { GenericListComponent } from './Utilities/generic-list/generic-list.component';
import { SoldItemComponent } from './Item/sold-item/sold-item.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { GoogleAuthenticationComponent } from './Authentication/google-authentication/google-authentication.component';
import { ViewAuthenticationComponent } from './Authentication/view-authentication/view-authentication.component'; 
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [
    AppComponent,
    IndexSupplierComponent,
    EditSupplierComponent,
    FormSupplierComponent,
    MenuComponent,
    PageNotFoundComponent,
    IndexDashboardComponent,
    DarkModeToggleComponent,
    IndexItemComponent,
    EditItemComponent,
    CreateItemComponent,
    FormItemComponent,
    CreateSupplierComponent,
    InputImageComponent,
    IndexStockComponent,
    CreateStockComponent,
    EditStockComponent,
    FormStockComponent,
    IndexCompanyComponent,
    CreateCompanyComponent,
    EditCompanyComponent,
    FormCompanyComponent,
    GenericListComponent,
    SoldItemComponent,
    GoogleAuthenticationComponent,
    ViewAuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    SocialLoginModule,
    CoolSocialLoginButtonsModule,
    MatTableExporterModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers:[{
          id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider('468376059865-op7htvrt2mu4f0s2qq0c3se19jovf2h1.apps.googleusercontent.com')
        }]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
