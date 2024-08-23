import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { g43ReporteComponent } from './componentes/g43Reporte.component';

const routes: Routes = [
  { path: '', component: g43ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g43ReporteRoutingModule {}
