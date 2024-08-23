import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../util/shared/shared.module';
import { g43ReporteRoutingModule } from './g43Reporte.routing';
import { g43ReporteComponent } from './componentes/g43Reporte.component';
import { ExcelService } from 'app/util/servicios/excel.service';

@NgModule({
  imports: [SharedModule, g43ReporteRoutingModule ],
  declarations: [g43ReporteComponent],
  providers: [ExcelService]
})
export class g43ReporteModule { }
