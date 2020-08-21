import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers/providers.component';
import { ShelfsComponent } from './shelfs/shelfs.component';
import { UsersComponent } from './users/users.component';
import { LaboratoriesComponent } from './laboratories/laboratories.component';
import { PipesModule } from '../pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../pipes/filter.pipe';
import { FilterProviderPipe } from '../pipes/filterProvider.pipe';
import { FilterPipeUser } from '../pipes/filterUser.pipe';
import { FilterPipeSale } from '../pipes/filterListProduct.pipe';


@NgModule({
  declarations: [
    ProvidersComponent,
    ShelfsComponent,
    UsersComponent,
    LaboratoriesComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    RouterModule,
    FormsModule,
    PipesModule,
    NgxPaginationModule,
  ],
  providers: [
    FormBuilder
  ]
})
export class AdministradorModule { }
