import { Component, Input, ViewChild, inject } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { UsuarioDTO } from '../usuario';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './listausuarios.component.html',
  styleUrl: './listausuarios.component.css'
})
export class ListausuariosComponent {
  @Input({ required: true }) usuarios: UsuarioDTO[] = [];
  @ViewChild(MatTable) tabla!: MatTable<any>;
  private router = inject(Router);
  private usuariosService = inject(UsuariosService);

  eliminarUsuario(usuario: UsuarioDTO) {
    if (confirm(`¿Estás seguro de eliminar a ${usuario.userName}?`)) {
      this.usuariosService.eliminar(usuario.id).subscribe(() => {
        this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
        this.tabla.renderRows();
      });
    }
  }

  verUsuario(usuario: UsuarioDTO) {
    this.router.navigate(['/usuario/ver', usuario.id]);
  }

  editarUsuario(usuario: UsuarioDTO) {
    this.router.navigate(['/usuario/editar', usuario.id]);
  }
}