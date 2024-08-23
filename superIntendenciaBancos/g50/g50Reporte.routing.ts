import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { g50ReporteComponent } from './componentes/g50Reporte.component';

const routes: Routes = [
  { path: '', component: g50ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g50ReporteRoutingModule {}
