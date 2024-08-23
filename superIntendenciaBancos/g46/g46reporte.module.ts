import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g46ReporteRoutingModule } from './g46reporte.routing';
import { g46ReporteComponent } from './componentes/g46reporte.component';

@NgModule({
  imports: [SharedModule, g46ReporteRoutingModule ],
  declarations: [g46ReporteComponent]
})
export class g46ReporteModule { }
