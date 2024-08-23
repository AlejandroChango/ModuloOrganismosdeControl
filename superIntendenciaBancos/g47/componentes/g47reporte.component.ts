import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'app/util/seguridad/sesion/localStorageService';
import { NgForm } from '@angular/forms';
import { DtoServicios } from '../../../../../../../util/servicios/dto.servicios';
import { Consulta } from '../../../../../../../util/dto/dto.component';
import { Mantenimiento } from '../../../../../../../util/dto/dto.component';
import { BaseComponent } from '../../../../../../../util/shared/componentes/base.component';
import { SelectItem } from 'primeng/primeng';
import * as JsonToXML from 'js2xmlparser';
import { ExcelService } from 'app/util/servicios/excel.service';


@Component({
  selector: 'app-g47Reporte',
  templateUrl: 'g47Reporte.html'
})
export class g47ReporteComponent extends BaseComponent implements OnInit, AfterViewInit {

  public lmesesini: SelectItem[] = [{ label: '...', value: null }];
  
  constructor(public localStorageService: LocalStorageService, router: Router, dtoServicios: DtoServicios, private excelService:ExcelService) {
    super(localStorageService, router, dtoServicios, '', 'REPORTEG47', false);
    this.componentehijo = this;
  }

  ngOnInit() {
    super.init();
    this.mfiltros.fperiodo = this.anioactual;
    this.fijarListaMeses();
  }

  fijarListaMeses() {
    this.lmesesini.push({ label: "ENERO", value: 1 });
    this.lmesesini.push({ label: "FEBRERO", value: 2 });
    this.lmesesini.push({ label: "MARZO", value: 3 });
    this.lmesesini.push({ label: "ABRIL", value: 4 });
    this.lmesesini.push({ label: "MAYO", value: 5 });
    this.lmesesini.push({ label: "JUNIO", value: 6 });
    this.lmesesini.push({ label: "JULIO", value: 7 });
    this.lmesesini.push({ label: "AGOSTO", value: 8 });
    this.lmesesini.push({ label: "SEPTIEMBRE", value: 9 });
    this.lmesesini.push({ label: "OCTUBRE", value: 10 });
    this.lmesesini.push({ label: "NOVIEMBRE", value: 11 });
    this.lmesesini.push({ label: "DICIEMBRE", value: 12 });
  }
  ngAfterViewInit() {
  }

  consultar() {

    if (this.estaVacio(this.mfiltros.fperiodo)) {
      this.mostrarMensajeError("INGRESE EL PERIODO");
      return;
    }
    this.generarReporte();
  }

  validaFiltrosConsulta(): boolean {
    return super.validaFiltrosConsulta();
  }




  public generarReporte() {
    this.rqConsulta.CODIGOCONSULTA = 'OC_G47REPORTE';
    this.rqConsulta.storeprocedure = "sp_OdCRptReporteG47";
    this.rqConsulta.parametro_anio = this.mfiltros.fperiodo;
    this.rqConsulta.parametro_mes = this.mfiltros.finicio;
    this.dtoServicios.ejecutarConsultaRest(this.rqConsulta)
      .subscribe(
        resp => {
          this.dtoServicios.llenarMensaje(resp, false);
          if (resp.cod !== 'OK') {
            return;
          }
          this.lregistros = resp.OC_G47REPORTE;
        },
        error => {
          this.dtoServicios.manejoError(error);
        });
  }

  imprimir(): void {
    const linkElement1 = document.createElement('a');
    var fechaUltimoDia = new Date(this.mfiltros.fperiodo, this.mfiltros.finicio, 0).getDate();
    var data = "";
    var archivo = "";
    var separador = ('\t');;
    var salto = ('\r\n');
    var contador = 0;
    var numerolineas = 0;
    var codigoSB: any;

    for (const i in this.lregistros) {
      if (this.lregistros.hasOwnProperty(i)) {
        let reg = this.lregistros[i];
        if (reg.identificacionSujeto !== undefined && reg.identificacionSujeto !== null) {
          if (contador === 0) {
            codigoSB = reg.codigoSB  ; // Guardar el primer registro
          } 
          data += reg.tipoIdentificacionSujeto + separador + reg.identificacionSujeto + separador + reg.numeroOperacion + separador
          + reg.numeroOperacionAnt + separador + reg.fechaNovacion + salto;
          contador++;
        }
      }
    }
    numerolineas = contador + 1;
    var m = this.mfiltros.finicio < 10 ? "0" + this.mfiltros.finicio : this.mfiltros.finicio
    var cabecera = 'G47' + separador + codigoSB + separador + fechaUltimoDia + '/' + m + '/' + this.mfiltros.fperiodo;
    archivo = cabecera + separador + numerolineas + salto + data;
    var blob = new Blob([archivo], { type: 'application/octet-stream' });
    const bloburl = URL.createObjectURL(blob);
    linkElement1.href = bloburl;
    linkElement1.download = "G47" + "M" + codigoSB + fechaUltimoDia + '' + m + '' + this.mfiltros.fperiodo + '.' + "txt";
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    linkElement1.dispatchEvent(clickEvent);

  }

  imprimirExcel(): void {
    var fechaUltimoDia = new Date(this.mfiltros.fperiodo, this.mfiltros.finicio, 0).getDate();

    let objData = [];
    let dataObj;
    var codigoSB = this.lregistros[0].codigoSB;

    for (const i in this.lregistros) {
      if (this.lregistros.hasOwnProperty(i)) {
        let reg = this.lregistros[i];
        if (reg.identificacionSujeto !== undefined && reg.identificacionSujeto !== null) {
          dataObj= {tipoIdentificacionSujeto: reg.tipoIdentificacionSujeto,
            identificacionSujeto: reg.identificacionSujeto,
            numeroOperacion: reg.numeroOperacion,
            numeroOperacionAnt: reg.numeroOperacionAnt,
            fechaNovacion: reg.fechaNovacion
          }
          objData.push(dataObj);
        }
      }
    }
    var m = this.mfiltros.finicio < 10 ? "0" + this.mfiltros.finicio : this.mfiltros.finicio
    let nombreArchivo = "G47" + "M" + codigoSB + fechaUltimoDia + m + this.mfiltros.fperiodo;
    this.excelService.exportAsExcelFile(objData, nombreArchivo);
  }

}
