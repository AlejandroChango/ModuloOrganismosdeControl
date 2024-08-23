import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g47ReporteRoutingModule } from './g47Reporte.routing';
import { g47ReporteComponent } from './componentes/g47reporte.component';
import { ExcelService } from 'app/util/servicios/excel.service';

@NgModule({
  imports: [SharedModule, g47ReporteRoutingModule ],
  declarations: [g47ReporteComponent],
  providers: [ExcelService]
})
export class g47ReporteModule { }
