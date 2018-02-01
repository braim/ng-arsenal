import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Importing Components */
import { allComponents } from './components/allComponents';

import { ImgcdnPipe } from './pipes/imgcdn.pipe';
import { LoggerService } from './services/logger.service';
import { IdManagerService } from './services/id-manager.service';
import { ClickOutsideDirective } from './components/angular2-multiselect-dropdown/clickOutside';
import { ListFilterPipe } from './components/angular2-multiselect-dropdown/list-filter';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ImgcdnPipe, ClickOutsideDirective, ListFilterPipe,
    ...allComponents
  ],
  exports: [
    ...allComponents
  ],
  providers: [
    IdManagerService
  ]
})
export class AgaFwModule { }
