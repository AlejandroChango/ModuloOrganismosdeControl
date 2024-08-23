import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g41ReporteRoutingModule } from './g41Reporte.routing';
import { g41ReporteComponent } from './componentes/g41Reporte.component';
import { ExcelService } from 'app/util/servicios/excel.service';

@NgModule({
  imports: [SharedModule, g41ReporteRoutingModule],
  declarations: [g41ReporteComponent],
  providers: [ExcelService]
})
export class g41ReporteModule { }
