// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { WaterComponent } from './water.component';
import { WaterDetailComponent } from './waterdetail.component';

// Theme Routing
import { ServicesRoutingModule } from './services-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
    ServicesRoutingModule,
	PaginationModule.forRoot(),
	ModalModule.forRoot(),
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()	
  ],
  declarations: [
    WaterComponent,
	WaterDetailComponent
  ]
})
export class ServicesModule { }
