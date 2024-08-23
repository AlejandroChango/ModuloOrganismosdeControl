import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { g45ReporteComponent } from './componentes/g45Reporte.component';

const routes: Routes = [
  { path: '', component: g45ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g45ReporteRoutingModule {}
