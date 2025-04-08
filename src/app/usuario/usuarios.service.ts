import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UsuarioCreacionDTO, UsuarioDTO } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiURL = environment.apiURL + 'cuentas';

  crear(usuario: UsuarioCreacionDTO): Observable<any> {
    return this.http.post(`${this.apiURL}/registrar`, usuario);
  }

  obtenerTodos(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${this.apiURL}`);
  }

  obtenerPorId(id: string): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiURL}/${id}`);
  }

  actualizar(id: string, usuario: UsuarioCreacionDTO): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, usuario);
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}