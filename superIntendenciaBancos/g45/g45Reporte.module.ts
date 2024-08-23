import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g45ReporteRoutingModule } from './g45Reporte.routing';
import { g45ReporteComponent } from './componentes/g45Reporte.component';
import { ExcelService } from 'app/util/servicios/excel.service';

@NgModule({
  imports: [SharedModule, g45ReporteRoutingModule ],
  declarations: [g45ReporteComponent],
  providers: [ExcelService]
})
export class g45ReporteModule { }
