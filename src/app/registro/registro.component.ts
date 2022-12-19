import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Cliente, Producto, Servicio } from '../model/servicio';
import { ServicioService } from './servicio.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { CustumModalComponent } from '../custum-modal/custum-modal.component';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [ServicioService]
})
export class RegistroComponent implements OnInit {

  public servicios: Servicio[] = [];
  public servicio: Servicio;
  public serviciotmp: Servicio;
  public errorMessage: string;
  m: number;

  constructor(private service: ServicioService, private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef) { }

  ngOnInit() {

    this.servicio = new Servicio();
    this.serviciotmp = new Servicio();
    this.servicio.indSave = null;
    this.getServicios();

  }

  public openCustomModal(pservicio) {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Detalle de la Deuda',
      childComponent: CustumModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      data: pservicio

    });
  }

  public getServicios() {
    this.service.getServicios().subscribe(
      servicios => {
        console.log(servicios);
        this.servicios = servicios;
        this.serviciotmp = servicios[0];
      },
      error => { this.errorMessage = <any>error; }
    );
  }


  public submit() {
    if (this.servicio.indSave === null) {
      this.servicio.cliente = this.serviciotmp.cliente;
      this.servicio.producto = this.serviciotmp.producto;
      this.servicio.estado = '0'; console.log('Saving Producto', this.servicio);
      this.create();
    } else {
      console.log('Producto update ', this.servicio);
      //this.updateProducto();
    }
    //this.resetear();
  }
  public create() {
    this.service.create(this.servicio).subscribe(
      transaccion => {
        console.log(transaccion); this.getServicios();
      },
      error => { this.errorMessage = <any>error; });
  }

  public delete(codigo) {
    this.service.deleteServicio(codigo).subscribe(
      transaccion => {
        console.log(transaccion);
        this.getServicios();
      },
      error => { this.errorMessage = <any>error; }
    );
  }

  public update(servicio: Servicio) {
    servicio.estado = "1";
    this.service.update(servicio).subscribe(
      transaccion => {
        console.log(transaccion);
        this.getServicios();
      },
      error => { this.errorMessage = <any>error; });
  }



}
