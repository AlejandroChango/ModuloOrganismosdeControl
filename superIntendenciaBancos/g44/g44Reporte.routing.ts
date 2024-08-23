import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { g44ReporteComponent } from './componentes/g44Reporte.component';

const routes: Routes = [
  {
    path: '', component: g44ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g44ReporteRoutingModule { }
