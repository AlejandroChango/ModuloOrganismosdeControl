import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g48ReporteRoutingModule } from './g48Reporte.routing';
import { g48ReporteComponent } from './componentes/g48reporte.component';
import { ExcelService } from 'app/util/servicios/excel.service';

@NgModule({
  imports: [SharedModule, g48ReporteRoutingModule],
  declarations: [g48ReporteComponent],
  providers: [ExcelService]
})
export class g48ReporteModule { }
