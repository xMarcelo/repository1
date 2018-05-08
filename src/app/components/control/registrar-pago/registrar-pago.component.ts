import { Component, OnInit, AfterViewInit, Input, ElementRef, 
          ViewChildren, QueryList, Output, EventEmitter, ViewChild } from '@angular/core';
import { MaestrosService, FuncionesService } from '../../../services/service.index';

@Component({
  selector: 'app-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styles: []
})
export class RegistrarPagoComponent implements OnInit, AfterViewInit {
  dtTipoPago: any[];  
  @Output() arrAdd: any[] = []; // valores de salida
  importeTotal: number = 0; 
  importeDiferencia: number = 0;  
  selectVal: number = 1;
  idsSeleccionados: string = '';
  isSelecCredito: boolean = false;   // si seleccionan pagar a credito deben indicar la fecha de pago
  isFormValido: boolean = false;
  @Input() totalPagar: number;  
  @ViewChildren ('selTP') selTPs: QueryList<ElementRef>;
  @ViewChild('importe') txt_importe: ElementRef;
  @ViewChild('fechacredito') fechacredito: ElementRef;
  @Output() recolector: EventEmitter<any> = new EventEmitter();


  constructor(private _maestrosService: MaestrosService, public _funcionesService: FuncionesService) { }

  ngOnInit() {
    this._maestrosService.listaGenerales('tipopago').subscribe((res: any) => {
      this.dtTipoPago = res.data;      
    });

    this.arrAdd.push({i: 0, restar: false, importe: 0, queda: false, idsel: '', idvalidar: ''});         
  }
  ngAfterViewInit() {
    this.txt_importe.nativeElement.focus();
    // console.log('focus pago');
  }

  addTipoPago(importe: number) {
    const index = this.arrAdd.length - 1; // ultimo index
    this.selectVal = this.selTPs.last.nativeElement.value;    
    if ( this.dtTipoPago.length ===  this.arrAdd.length) { return; }     
    
    this.arrAdd[index].idsel = this.selectVal;
    this.arrAdd[index].importe = importe;
    this.arrAdd[index].queda = true;

    // this.idsSeleccionados += this.selectVal + ',';
    // this.idsSeleccionados = this.idsSeleccionados.slice(0, -1);
    this.obtenerIdTpSeleccionados();
    
    this.arrAdd.push({i: 0, restar: true, importe: 0, queda: false, idsel: '', idvalidar: this.idsSeleccionados});    
    console.log(this.arrAdd);    
  }

  obtenerIdTpSeleccionados() { 
    let id_rpt: string = '';
    this.arrAdd.forEach(element => {
      id_rpt += element.idsel + ',';
    });
    id_rpt = id_rpt.slice(0, -1);
    this.idsSeleccionados = id_rpt;
  }

  quitarTipoPago(index: number) {    
    this.idsSeleccionados = this.idsSeleccionados.replace(this.arrAdd[index].idsel, '');    
    this.arrAdd.splice(index, 1);    

    if (this.arrAdd.length === 1 ) {this.arrAdd[0].queda = false; } // si solo queda uno habilita cambio
    this.sumarCantidad();
  }

  addImporte(i: number, importe: number) {    
    this.arrAdd[i].importe = importe;    
    this.sumarCantidad();

    if ( this.importeDiferencia > 0 ) { 
      this.arrAdd[i].importeR = importe - this.importeDiferencia; 
    } else { this.arrAdd[i].importeR = importe; }
  }

  sumarCantidad() {
    this.importeTotal = 0;
    this.arrAdd.forEach(element => {
      const valElement: number = isNaN(parseFloat(element.importe)) ? 0 : parseFloat(element.importe);
      this.importeTotal += valElement;
    });

    this.importeDiferencia = (this.importeTotal - this.totalPagar);
    // this.isFormValido = this.importeDiferencia < 0 ? false : true;    
    this.ObtenerInfo();
  }

  ObtenerInfo() {
    const index_last = this.arrAdd.length - 1;    
    if ( this.arrAdd[index_last].idsel === '') { this.arrAdd[index_last].idsel = this.selTPs.last.nativeElement.value; }    
    
    if ( this.isSelecCredito ) {
      if ( this.fechacredito.nativeElement.value.length === 0 ||  this.importeDiferencia < 0) { this.isFormValido = false; 
        } else { this.isFormValido = true; } 
    } else {
      if ( this.importeDiferencia < 0) { this.isFormValido = false; } else { this.isFormValido = true; } 
    }   
    this.recolector.emit({diferencia: this.importeDiferencia, tipopago: this.arrAdd, valido: this.isFormValido});    
  }

  selectTP ( val: string ) {    
    let hayCredito: boolean = false;    
    this.selTPs.forEach(element => {
      if (element.nativeElement.value === '3') { hayCredito = true; }
    });    

    this.isSelecCredito = hayCredito;
  }

  fechaCredito() {
    this.ObtenerInfo();
  }

}
