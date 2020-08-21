import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { InventaryComponent } from './pages/manager/inventary/inventary.component';
import { CityComponent } from './pages/manager/city/city.component';
import { DepartmentComponent } from './pages/manager/department/department.component';
import { RolComponent } from './pages/manager/rol/rol.component';
import { StatusComponent } from './pages/manager/status/status.component';
import { TypeproductComponent } from './pages/manager/typeproduct/typeproduct.component';
import { PharmacyComponent } from './pages/manager/pharmacy/pharmacy.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { SalesComponent } from './pages/manager/sales/sales.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AdministradorRoutingModule } from './administrador/administrador-routing.module';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'inventario', component: InventaryComponent },
  { path: 'ciudad', component: CityComponent },
  { path: 'departamento', component: DepartmentComponent },
  { path: 'rol', component: RolComponent },
  { path: 'estado', component: StatusComponent },
  { path: 'farmacia', component: PharmacyComponent },
  { path: 'tipo producto', component: TypeproductComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'venta', component: SalesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true}),
  AuthRoutingModule,
  AdministradorRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
