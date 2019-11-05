import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import PagerService from '../services/pager.service';
import RequisitionService from '../services/requisition.service';
import CustomFilterPipe from '../helpers/filter.pipe';
import FakeBackendProvider from '../helpers/fake-backend';

import AppComponent from './app.component';

import ModalService from './modal/modal.service';
import ModalComponent from './modal/modal.directive';

import { SortService } from './sortable-table/sort.service';
import { SortableTableDirective } from './sortable-table/sortable-table.directive';
import { SortableColumnComponent } from './sortable-table/sortable-column.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    SortableColumnComponent,
    SortableTableDirective,
    CustomFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ModalService,
    RequisitionService,
    FakeBackendProvider,
    PagerService,
    SortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
