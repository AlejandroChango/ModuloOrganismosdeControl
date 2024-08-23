import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g44ReporteRoutingModule } from './g44Reporte.routing';
import { g44ReporteComponent } from './componentes/g44Reporte.component';
import { ExcelService } from 'app/util/servicios/excel.service';

@NgModule({
  imports: [SharedModule, g44ReporteRoutingModule],
  declarations: [g44ReporteComponent],
  providers: [ExcelService]
})
export class g44ReporteModule { }
