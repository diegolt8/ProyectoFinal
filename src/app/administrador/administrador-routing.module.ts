import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministadorComponent } from './administador.component';
import { ProvidersComponent } from './providers/providers.component';
import { ShelfsComponent } from './shelfs/shelfs.component';
import { UsersComponent } from './users/users.component';
import { LaboratoriesComponent } from './laboratories/laboratories.component';


const routes: Routes = [
  {path: 'administrador', component: AdministadorComponent, 
    children: [
      { path: 'proveedor', component: ProvidersComponent },
      { path: 'estante', component: ShelfsComponent },
      { path: 'usuario', component: UsersComponent },
      { path: 'laboratorio', component: LaboratoriesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
