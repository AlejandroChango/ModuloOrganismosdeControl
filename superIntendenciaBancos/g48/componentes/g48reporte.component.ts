import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'app/util/seguridad/sesion/localStorageService';
import { NgForm } from '@angular/forms';
import { DtoServicios } from '../../../../../../../util/servicios/dto.servicios';
import { Consulta } from '../../../../../../../util/dto/dto.component';
import { Mantenimiento } from '../../../../../../../util/dto/dto.component';
import { BaseComponent } from '../../../../../../../util/shared/componentes/base.component';
import { SelectItem } from 'primeng/primeng';
import { ExcelService } from 'app/util/servicios/excel.service';


@Component({
  selector: 'app-g48Reporte',
  templateUrl: 'g48Reporte.html'
})
export class g48ReporteComponent extends BaseComponent implements OnInit, AfterViewInit {

  public lmesesini: SelectItem[] = [{ label: '...', value: null }];
  
  constructor(public localStorageService: LocalStorageService, router: Router, dtoServicios: DtoServicios, private excelService:ExcelService) {
    super(localStorageService, router, dtoServicios, '', 'REPORTEG48', false);
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
    this.rqConsulta.CODIGOCONSULTA = 'OC_G48REPORTE';
    this.rqConsulta.storeprocedure = "sp_OdcRptReporteg48SuperB";
    this.rqConsulta.parametro_anio = this.mfiltros.fperiodo;
    this.rqConsulta.parametro_finicio = this.mfiltros.finicio;
    this.dtoServicios.ejecutarConsultaRest(this.rqConsulta)
      .subscribe(
        resp => {
          this.dtoServicios.llenarMensaje(resp, false);
          if (resp.cod !== 'OK') {
            return;
          }
          this.lregistros = resp.OC_G48REPORTE;
        },
        error => {
          this.dtoServicios.manejoError(error);
        });
  }

  imprimir(): void {
    const linkElement1 = document.createElement('a');
    var fechaUltimoDia = new Date(this.mfiltros.fperiodo, this.mfiltros.finicio, 0).getDate();
    var m = this.mfiltros.finicio < 10 ? "0" + this.mfiltros.finicio : this.mfiltros.finicio;
    var codigoSB = this.lregistros[0].codigoSB
    var data = "";
    var archivo = "";
    var separador = ('\t');;
    var salto = ('\r\n');
    var cabecera = 'G48' + separador + codigoSB + separador + fechaUltimoDia + '/' + m + '/' + this.mfiltros.fperiodo;
    var contador = 0;
    var numerolineas = 0;

    for (const i in this.lregistros) {
      if (this.lregistros.hasOwnProperty(i)) {
        let reg = this.lregistros[i];
        if (reg.idSujeto !== undefined && reg.idSujeto !== null) {
          data += reg.tipoIdSujeto + separador +
                  reg.idSujeto + separador + 
                  reg.numeroOperacion + separador +
                  reg.tipoProducto + separador +
                  reg.diasMorosidad + separador +
                  reg.califPropia + separador +
                  reg.tasaInteres + separador +
                  reg.valorXVencer + separador +
                  //reg.valorNoDevengaInteres + separador +
                  reg.valorVencido + separador +
                  reg.costosOperativos + separador +
                  reg.interesOrdinario + separador +
                  reg.interesSobreMora + separador +
                  reg.valorDemandaJudicial + separador +
                  reg.carteraCastigada + separador +
                  reg.provicionRequeridaOriginal + separador +
                  reg.provisionConstituida + separador +
                  reg.valorCuentaIndividual + separador +
                  reg.valorProvision + separador +
                  reg.tipoSistemaAmortizacion + separador +
                  reg.cuotaCredito + separador +
                  reg.dividendo + separador +
                  reg.fechaExigibilidadCuota + salto;
          contador++;
        }
      }
    }
    numerolineas = contador + 1;
    archivo = cabecera + separador + numerolineas + salto + data;
    var blob = new Blob([archivo], { type: 'application/octet-stream' });
    const bloburl = URL.createObjectURL(blob);
    linkElement1.href = bloburl;
    linkElement1.download = "G48" + "M" + codigoSB + fechaUltimoDia + '' + m + '' + this.mfiltros.fperiodo + '.' + "txt";
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
    var m = this.mfiltros.finicio < 10 ? "0" + this.mfiltros.finicio : this.mfiltros.finicio;
    var codigoSB = this.lregistros[0].codigoSB

    for (const i in this.lregistros) {
      if (this.lregistros.hasOwnProperty(i)) {
        let reg = this.lregistros[i];
        if (reg.idSujeto !== undefined && reg.idSujeto !== null) {
          dataObj = {tipoIdSujeto: reg.tipoIdSujeto,
            idSujeto: reg.idSujeto,
            numeroOperacion: reg.numeroOperacion,
            tipoProducto: reg.tipoProducto,
            diasMorosidad: reg.diasMorosidad,
            califPropia: reg.califPropia,
            tasaInteres: reg.tasaInteres,
            valorXVencer: reg.valorXVencer,
            valorNoDevengaInteres: reg.valorNoDevengaInteres,
            valorVencido: reg.valorVencido,
            costosOperativos: reg.costosOperativos,
            interesOrdinario: reg.interesOrdinario,
            interesSobreMora: reg.interesSobreMora,
            valorDemandaJudicial: reg.valorDemandaJudicial,
            carteraCastigada: reg.carteraCastigada,
            provicionRequeridaOriginal: reg.provicionRequeridaOriginal,
            provisionConstituida: reg.provisionConstituida,
            valorCuentaIndividual: reg.valorCuentaIndividual,
            valorProvision: reg.valorProvision,
            tipoSistemaAmortizacion: reg.tipoSistemaAmortizacion,
            cuotaCredito: reg.cuotaCredito,
            dividendo: reg.dividendo,
            fechaExigibilidadCuota: reg.fechaExigibilidadCuota
          }
          objData.push(dataObj);
        }
      }
    }
    
    let nombreArchivo= "G48" + "M" + codigoSB + fechaUltimoDia + '' + m + '' + this.mfiltros.fperiodo;
    this.excelService.exportAsExcelFile(objData, nombreArchivo);
  }
}