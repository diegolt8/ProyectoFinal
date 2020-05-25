import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InventaryComponent } from './pages/manager/inventary/inventary.component';
import { ProvidersComponent } from './pages/manager/providers/providers.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { SalesComponent } from './pages/manager/sales/sales.component';
import { UsersComponent } from './pages/manager/users/users.component';
import { ShelfsComponent } from './pages/manager/shelfs/shelfs.component';
import { LaboratoriesComponent } from './pages/manager/laboratories/laboratories.component';
import { CityComponent } from './pages/manager/city/city.component';
import { DatePipe } from '@angular/common';
import { DepartmentComponent } from './pages/manager/department/department.component';
import { RolComponent } from './pages/manager/rol/rol.component';
import { StatusComponent } from './pages/manager/status/status.component';
import { TypeproductComponent } from './pages/manager/typeproduct/typeproduct.component';
import { LoginComponent } from './pages/login/login.component';
import { FilterPipe } from 'src/pipes/filter.pipe';
import { StorageService } from './services/storage.service';
import { PharmacyComponent } from './pages/manager/pharmacy/pharmacy.component';
import { AdministadorComponent } from './pages/administador/administador.component';
import { FilterProviderPipe } from 'src/pipes/filterProvider.pipe';
import { FilterPipeUser } from 'src/pipes/filterUser.pipe';
import { EmpleadoComponent } from './pages/empleado/empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    InventaryComponent,
    ProvidersComponent,
    CarouselComponent,
    CarritoComponent,
    SalesComponent,
    UsersComponent,
    ShelfsComponent,
    LaboratoriesComponent,
    CityComponent,
    DepartmentComponent,
    RolComponent,
    StatusComponent,
    TypeproductComponent,
    LoginComponent,
    FilterPipe,
    FilterProviderPipe,
    FilterPipeUser,
    PharmacyComponent,
    AdministadorComponent,
    EmpleadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    FormBuilder,
    DatePipe,
    FilterPipe,
    FilterProviderPipe,
    FilterPipeUser,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
