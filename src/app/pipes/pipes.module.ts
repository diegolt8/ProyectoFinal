import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterProviderPipe } from './filterProvider.pipe';
import { FilterPipeUser } from './filterUser.pipe';
import { FilterPipeSale } from './filterListProduct.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    FilterProviderPipe,
    FilterPipeUser,
    FilterPipeSale
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe,
    FilterProviderPipe,
    FilterPipeUser,
    FilterPipeSale
  ]
})
export class PipesModule { }
