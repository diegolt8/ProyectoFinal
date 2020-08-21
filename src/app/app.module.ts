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
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { SalesComponent } from './pages/manager/sales/sales.component';
import { CityComponent } from './pages/manager/city/city.component';
import { DatePipe } from '@angular/common';
import { DepartmentComponent } from './pages/manager/department/department.component';
import { RolComponent } from './pages/manager/rol/rol.component';
import { StatusComponent } from './pages/manager/status/status.component';
import { TypeproductComponent } from './pages/manager/typeproduct/typeproduct.component';
import { StorageService } from './services/storage.service';
import { PharmacyComponent } from './pages/manager/pharmacy/pharmacy.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { AuthModule } from './auth/auth.module';
import { AdministradorModule } from './administrador/administrador.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    InventaryComponent,
    CarouselComponent,
    CarritoComponent,
    SalesComponent,
    CityComponent,
    DepartmentComponent,
    RolComponent,
    StatusComponent,
    TypeproductComponent,
    PharmacyComponent,
    EmpleadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AuthModule,
    AdministradorModule,
    PipesModule
  ],
  providers: [
    FormBuilder,
    DatePipe,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
