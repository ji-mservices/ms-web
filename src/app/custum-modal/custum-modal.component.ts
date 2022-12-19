import { Component, OnInit, ComponentRef } from '@angular/core';
import { IModalDialogOptions, IModalDialog } from 'ngx-modal-dialog';
import { Servicio } from '../model/servicio';

@Component({
  selector: 'app-custum-modal',
  templateUrl: './custum-modal.component.html',
  styleUrls: ['./custum-modal.component.css']
})
export class CustumModalComponent implements OnInit, IModalDialog {
  private internalActionButtons = [];
  parentInfo: Servicio;
  constructor() { }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<Servicio>>) {
    //this.parentInfo = options.data; 1
    this.parentInfo = options.data;
    options.actionButtons = this.internalActionButtons;
    this.internalActionButtons.push({
      text: 'Close',
      buttonClass: 'btn btn-success',
      onAction: () => true
    });
  }
  ngOnInit() { }
}