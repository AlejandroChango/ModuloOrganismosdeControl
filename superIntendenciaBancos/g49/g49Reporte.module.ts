import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g49ReporteRoutingModule } from './g49Reporte.routing';
import { g49ReporteComponent } from './componentes/g49reporte.component';
import { ExcelService } from 'app/util/servicios/excel.service';

@NgModule({
  imports: [SharedModule, g49ReporteRoutingModule],
  declarations: [g49ReporteComponent],
  providers: [ExcelService]
})
export class g49ReporteModule { }
