import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "app/util/seguridad/sesion/localStorageService";
import { DtoServicios } from "../../../../../../../util/servicios/dto.servicios";
import { Consulta } from "../../../../../../../util/dto/dto.component";
import { Mantenimiento } from "../../../../../../../util/dto/dto.component";
import { BaseComponent } from "../../../../../../../util/shared/componentes/base.component";
import { SelectItem } from "primeng/primeng";
import * as JsonToXML from "js2xmlparser";
import { sep } from "path";
import { ExcelService } from "app/util/servicios/excel.service";

@Component({
  selector: "app-g511Reporte",
  templateUrl: "g51Reporte.html",
})
export class g51ReporteComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  public lmesesini: SelectItem[] = [{ label: "...", value: null }];
  estructura = {
    DatosEstructura: {
      CodigoEstructura: "",
      CodigoEntidad: "",
      FechaCorte: "",
      TotalRegistros: "",
    },
    Detalle: {
      Registro: [],
    },
  };
  constructor(
    public localStorageService: LocalStorageService,
    router: Router,
    dtoServicios: DtoServicios,
    private excelService:ExcelService
  ) {
    super(localStorageService, router, dtoServicios, "", "REPORTEG51", false);
    this.componentehijo = this;
  }

  ngOnInit() {
    super.init();
    this.mfiltros.fperiodo = this.anioactual;
    this.fijarListaMeses();
  }
  fijarListaMeses() {
    this.lmesesini.push({ label: "ENERO", value: "01" });
    this.lmesesini.push({ label: "FEBRERO", value: "02" });
    this.lmesesini.push({ label: "MARZO", value: "03" });
    this.lmesesini.push({ label: "ABRIL", value: "04" });
    this.lmesesini.push({ label: "MAYO", value: "05" });
    this.lmesesini.push({ label: "JUNIO", value: "06" });
    this.lmesesini.push({ label: "JULIO", value: "07" });
    this.lmesesini.push({ label: "AGOSTO", value: "08" });
    this.lmesesini.push({ label: "SEPTIEMBRE", value: "09" });
    this.lmesesini.push({ label: "OCTUBRE", value: 10 });
    this.lmesesini.push({ label: "NOVIEMBRE", value: 11 });
    this.lmesesini.push({ label: "DICIEMBRE", value: 12 });
  }
  ngAfterViewInit() {}
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
    this.rqConsulta.CODIGOCONSULTA = "OC_G51REPORTE";
    this.rqConsulta.storeprocedure = "sp_OdcRptReporteG51";
    this.rqConsulta.parametro_anio = this.mfiltros.fperiodo;
    this.rqConsulta.parametro_finicio = this.mfiltros.finicio;

    this.dtoServicios.ejecutarConsultaRest(this.rqConsulta).subscribe(
      (resp) => {
        this.dtoServicios.llenarMensaje(resp, false);
        if (resp.cod !== "OK") {
          return;
        }
        this.lregistros = resp.OC_G51REPORTE;
      },
      (error) => {
        this.dtoServicios.manejoError(error);
      }
    );
  }

  imprimir(): void {
    const linkElement1 = document.createElement("a");
    var fechaUltimoDia = new Date(
      this.mfiltros.fperiodo,
      this.mfiltros.finicio,
      0
    ).getDate();
    var codigoSB = this.lregistros[0].codigoSB
    var data = "";
    var archivo = "";
    var separador = "\t";
    var salto = "\r\n";
    var cabecera =
      "G51" +
      separador +
      codigoSB +
      separador +
      fechaUltimoDia +
      "/" +
      this.mfiltros.finicio +
      "/" +
      this.mfiltros.fperiodo;
    var contador = 0;
    var numerolineas = 0;
    var cuadre = 0;
    for (const i in this.lregistros) {
      if (this.lregistros.hasOwnProperty(i)) {
        let reg = this.lregistros[i];
        data +=
          reg.tipoIdSujeto +
          separador +
          reg.idSujeto +
          separador +
          reg.numOperacion +
          separador +
          reg.numGarantiaOperacion +
          separador +
          reg.tipoGarantia +
          separador +
          reg.descGarantia +
          separador +
          reg.valorAvaluo +
          separador +
          reg.fechaAvaluo +
          separador +
          reg.numRegistroGarantia +
          separador +
          reg.fechaContabilizacionGarantia +
          separador +
          reg.porcentajeGarantia +
          separador +
          reg.estadoRegistro +
          salto;
          contador++;
      }
    }
    numerolineas = contador + 1;
    this.estructura.DatosEstructura.CodigoEstructura = "G45";
    this.estructura.DatosEstructura.CodigoEntidad = "1";
    this.estructura.DatosEstructura.FechaCorte =
      fechaUltimoDia +
      "/" +
      this.mfiltros.finicio +
      "/" +
      this.mfiltros.fperiodo;
    this.estructura.DatosEstructura.TotalRegistros = contador.toString();
    archivo = cabecera + separador + numerolineas + salto + data;
    var blob = new Blob([archivo], { type: "application/octet-stream" });
    const bloburl = URL.createObjectURL(blob);
    linkElement1.href = bloburl;
    linkElement1.download =
      "G51M" +
      codigoSB +
      fechaUltimoDia +
      "" +
      this.mfiltros.finicio +
      "" +
      this.mfiltros.fperiodo +
      "." +
      "txt";
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false,
    });
    linkElement1.dispatchEvent(clickEvent);
  }

  imprimirExcel(): void {
    var fechaUltimoDia = new Date(
      this.mfiltros.fperiodo,
      this.mfiltros.finicio,
      0
    ).getDate();
    
    let objData = [];
    let dataObj;
    var codigoSB = this.lregistros[0].codigoSB
    for (const i in this.lregistros) {
      if (this.lregistros.hasOwnProperty(i)) {
        let reg = this.lregistros[i];
        dataObj = {
          tipoIdSujeto: reg.tipoIdSujeto,
          idSujeto: reg.idSujeto,
          numOperacion: reg.numOperacion,
          numGarantiaOperacion: reg.numGarantiaOperacion,
          tipoGarantia: reg.tipoGarantia,
          descGarantia: reg.descGarantia,
          valorAvaluo: reg.valorAvaluo ,
          fechaAvaluo: reg.fechaAvaluo ,
          numRegistroGarantia: reg.numRegistroGarantia,
          fechaContabilizacionGarantia: reg.fechaContabilizacionGarantia ,
          porcentajeGarantia: reg.porcentajeGarantia,
          estadoRegistro: reg.estadoRegistro
        }
        objData.push(dataObj);
      }
    }
    
    let nombreArchivo = "G51M" + codigoSB + fechaUltimoDia + "" + this.mfiltros.finicio + "" + this.mfiltros.fperiodo ;
    this.excelService.exportAsExcelFile(objData, nombreArchivo);
  }
  
}
