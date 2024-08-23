import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g51ReporteRoutingModule } from './g51Reporte.routing';
import { g51ReporteComponent } from './componentes/g51Reporte.component';
import { ExcelService } from 'app/util/servicios/excel.service';
@NgModule({
  imports: [SharedModule, g51ReporteRoutingModule ],
  declarations: [g51ReporteComponent],
  providers: [ExcelService]
})
export class g51ReporteModule { }
