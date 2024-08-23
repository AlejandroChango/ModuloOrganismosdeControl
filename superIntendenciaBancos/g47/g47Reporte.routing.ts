import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { g47ReporteComponent } from './componentes/g47reporte.component';

const routes: Routes = [
  { path: '', component: g47ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g47ReporteRoutingModule {}
