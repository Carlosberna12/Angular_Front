import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ListausuariosComponent } from '../listausuarios/listausuarios.component';
import { MatIconModule } from '@angular/material/icon';
import { UsuariosService } from '../usuarios.service';
import { UsuarioDTO } from '../usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatButtonModule, ListausuariosComponent, MatIconModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  cargando = true;
  usuariosList: UsuarioDTO[] = [];
  private usuariosService = inject(UsuariosService);

  ngOnInit(): void {
    console.log('Componente UsuariosComponent inicializado');
  
    this.usuariosService.obtenerTodos().subscribe({
      next: (usuarios) => {
        console.log('Usuarios recibidos desde la API:', usuarios);
        this.usuariosList = usuarios;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
        this.cargando = false;
      }
    });
  }
  
}
