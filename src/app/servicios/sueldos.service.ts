import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SueldosService {

  private baseUrl = this.getFullContextPath()+"/servicio";
  constructor(
    private httpClient: HttpClient
  ) { }

  // Método para calcular sueldos
  calcularSueldos(nodo){
    return this.httpClient
    .post(this.baseUrl + "/calcularSueldo/",nodo)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getFullContextPath(): string {
    return "http://localhost:8080/ResuelveFC";
  }
}
