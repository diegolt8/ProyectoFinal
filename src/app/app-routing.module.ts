import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaComponent } from './pages/venta/venta.component';
import { HomeComponent } from './pages/home/home.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { InventaryComponent } from './pages/manager/inventary/inventary.component';
import { LaboratoriesComponent } from './pages/manager/laboratories/laboratories.component';
import { ProvidersComponent } from './pages/manager/providers/providers.component';


const routes: Routes = [
  { path: 'venta', component: VentaComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'inventario', component: InventaryComponent },
  { path: 'laboratorio', component: LaboratoriesComponent },
  { path: 'proveedor', component: ProvidersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
