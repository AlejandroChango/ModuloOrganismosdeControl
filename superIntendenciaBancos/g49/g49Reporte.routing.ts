import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { g49ReporteComponent } from './componentes/g49reporte.component';

const routes: Routes = [
  {
    path: '', component: g49ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g49ReporteRoutingModule { }
