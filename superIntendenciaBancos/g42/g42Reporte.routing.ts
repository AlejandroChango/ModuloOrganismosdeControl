import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { g42ReporteComponent } from './componentes/g42Reporte.component';

const routes: Routes = [
  {
    path: '', component: g42ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g42ReporteRoutingModule { }
