import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { g51ReporteComponent } from './componentes/g51Reporte.component';

const routes: Routes = [
  { path: '', component: g51ReporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class g51ReporteRoutingModule {}
