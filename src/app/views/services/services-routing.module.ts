import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaterComponent } from './water.component';
import { WaterDetailComponent } from './waterdetail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Servicios'
    },
    children: [
      {
        path: '',
        redirectTo: 'water'
      },
      {
        path: 'water',
        component: WaterComponent,
        data: {
          title: 'Consumo de Agua'
        }
      },
      {
        path: 'waterdetail',
        component: WaterDetailComponent,
        data: {
          title: 'Dashboard de Consumo'
        }
      }
	  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
