import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { g48ReporteComponent } from './componentes/g48reporte.component';

const routes: Routes = [
  {
    path: '', component: g48ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g48ReporteRoutingModule { }
