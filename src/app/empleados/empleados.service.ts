import { inject, Injectable } from '@angular/core';
import { EmpleadoCreacionDTO, EmpleadoDTO } from './empleado.';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private http = inject(HttpClient);
  private url = environment.apiURL + 'empleados';

  constructor() {}

  public obtenerEmpleados(): Observable<EmpleadoCreacionDTO[]> {
    return this.http.get<EmpleadoCreacionDTO[]>(this.url);
  }

  public crearEmpleado(empleado: EmpleadoCreacionDTO): Observable<any> {
    return this.http.post(this.url, empleado);
  }

  obtenerEmpleadoPorId(id: number): Observable<EmpleadoDTO> {
    return this.http.get<EmpleadoDTO>(`${this.url}/${id}`);
  }
  
  public actualizarEmpleado(id: number, empleado: EmpleadoCreacionDTO): Observable<any> {
    return this.http.put(`${this.url}/${id}`, empleado);
  }

  public eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  
}