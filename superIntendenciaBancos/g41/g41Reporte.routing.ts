import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { g41ReporteComponent } from './componentes/g41Reporte.component';

const routes: Routes = [
  {
    path: '', component: g41ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g41ReporteRoutingModule { }
