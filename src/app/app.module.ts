import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InventaryComponent } from './pages/manager/inventary/inventary.component';
import { ProvidersComponent } from './pages/manager/providers/providers.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { VentaComponent } from './pages/venta/venta.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { SalesComponent } from './pages/manager/sales/sales.component';
import { UsersComponent } from './pages/manager/users/users.component';
import { ShelfsComponent } from './pages/manager/shelfs/shelfs.component';
import { LaboratoriesComponent } from './pages/manager/laboratories/laboratories.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    InventaryComponent,
    ProvidersComponent,
    CarouselComponent,
    VentaComponent,
    CarritoComponent,
    SalesComponent,
    UsersComponent,
    ShelfsComponent,
    LaboratoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
