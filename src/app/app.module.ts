import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { CustumModalComponent } from './custum-modal/custum-modal.component';
import { AutenticacionGuardService } from './security/autenticacion-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    CustumModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalDialogModule.forRoot()
  ],
  providers: [AutenticacionGuardService],
  entryComponents:[CustumModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
