import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { g46ReporteComponent } from './componentes/g46reporte.component';

const routes: Routes = [
  { path: '', component: g46ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g46ReporteRoutingModule {}
