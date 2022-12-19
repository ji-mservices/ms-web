import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Usuario } from '../model/usuario';
import { Servicio } from '../model/servicio';
import { Transaccion } from '../model/transaccion';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  public servicioUrl = 'http://localhost:8081/pagolinea'; // URL to web API
  //servicioUrl = 'http://apibsoftcore.azurewebsites.net/api/Debts';
  public servicios: Servicio[] = [];
  public servicio: Servicio;
  public errorMessage: string;

  constructor(private http: HttpClient) { }

  /*
  public getServicios(): Observable<Servicio[]> {
    let tok=sessionStorage.getItem('token');
    return this.http.get<Servicio[]>(this.servicioUrl+"/ListDebts/1/1",httpOptions).pipe(
    tap((servicios:Servicio[])=>console.log("servicios",JSON.stringify(servicios))),
    catchError(this.handleError('getServicios', [])) );
  }*/

  public getServicios(): Observable<Servicio[]> {
    let tok = sessionStorage.getItem('token');
    let url = this.servicioUrl + "/facturacion/idCliente/1/idEmpresa/1";
    //return this.http.get<Servicio[]>(this.servicioUrl+"/facturacion/idCliente/1/idEmpresa/1",httpOptions).pipe(
    //return this.http.get<Servicio[]>("http://localhost:8081/msconsulta/facturacion/idCliente/1/idEmpresa/1",httpOptions).pipe(
    return this.http.get<Servicio[]>("http://localhost:8091/msbconsulta/servicios/feign/consulta", httpOptions).pipe(
      tap((servicios: Servicio[]) => console.log("servicios", JSON.stringify(servicios))),
      catchError(this.handleError('getServicios', [])));
  }

  public create(servicio: Servicio): Observable<Transaccion> {
    return this.http.post<Transaccion>("http://localhost:8775/msb-consulta/msbconsulta/facturacion/feign/idCliente/1/idEmpresa/1", JSON.stringify(servicio), httpOptions).pipe(
      tap((transaccion: Transaccion) => console.log(transaccion.codigo)),
      catchError(this.handleError<Transaccion>('create'))
    );
  }


  public deleteServicio(id: number): Observable<Transaccion> {
    return this.http.delete<Transaccion>(this.servicioUrl + "/facturacion/delete/" + id, httpOptions).pipe(
      tap((transaccion: Transaccion) => console.log(transaccion.codigo)),
      catchError(this.handleError<Transaccion>('deleteHero'))
    )
  }

  public update(servicio: Servicio): Observable<Transaccion> {
    return this.http.put<Transaccion>(this.servicioUrl + "/facturacion/pagar", JSON.stringify(servicio), httpOptions).pipe(
      tap((transaccion: Transaccion) => console.log(transaccion.codigo)),
      catchError(this.handleError<Transaccion>('update'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
