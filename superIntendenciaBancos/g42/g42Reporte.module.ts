import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g42ReporteRoutingModule } from './g42Reporte.routing';
import { g42ReporteComponent } from './componentes/g42Reporte.component';
import { ExcelService } from 'app/util/servicios/excel.service';

@NgModule({
  imports: [SharedModule, g42ReporteRoutingModule],
  declarations: [g42ReporteComponent],
  providers: [ExcelService]
})
export class g42ReporteModule { }
