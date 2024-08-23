import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g50ReporteRoutingModule } from './g50Reporte.routing';
import { g50ReporteComponent } from './componentes/g50Reporte.component';
import { ExcelService } from 'app/util/servicios/excel.service';
@NgModule({
  imports: [SharedModule, g50ReporteRoutingModule ],
  declarations: [g50ReporteComponent],
  providers: [ExcelService]
})
export class g50ReporteModule { }
