import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { InventaryComponent } from './pages/manager/inventary/inventary.component';
import { ProvidersComponent } from './pages/manager/providers/providers.component';
import { ShelfsComponent } from './pages/manager/shelfs/shelfs.component';
import { UsersComponent } from './pages/manager/users/users.component';
import { CityComponent } from './pages/manager/city/city.component';
import { DepartmentComponent } from './pages/manager/department/department.component';
import { LaboratoriesComponent } from './pages/manager/laboratories/laboratories.component';
import { RolComponent } from './pages/manager/rol/rol.component';
import { StatusComponent } from './pages/manager/status/status.component';
import { TypeproductComponent } from './pages/manager/typeproduct/typeproduct.component';
import { LoginComponent } from './pages/login/login.component';
import { PharmacyComponent } from './pages/manager/pharmacy/pharmacy.component';
import { AdministadorComponent } from './pages/administador/administador.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { SalesComponent } from './pages/manager/sales/sales.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'inventario', component: InventaryComponent },
  { path: 'proveedor', component: ProvidersComponent },
  { path: 'estante', component: ShelfsComponent },
  { path: 'usuario', component: UsersComponent },
  { path: 'ciudad', component: CityComponent },
  { path: 'departamento', component: DepartmentComponent },
  { path: 'laboratorio', component: LaboratoriesComponent },
  { path: 'rol', component: RolComponent },
  { path: 'estado', component: StatusComponent },
  { path: 'farmacia', component: PharmacyComponent },
  { path: 'tipo producto', component: TypeproductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'administrador', component: AdministadorComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'venta', component: SalesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
