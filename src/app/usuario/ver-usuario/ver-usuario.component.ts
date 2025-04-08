import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { UsuarioDTO } from '../usuario';

@Component({
  selector: 'app-ver-usuario',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ver-usuario.component.html',
  styleUrl: './ver-usuario.component.css'
})
export class VerUsuarioComponent implements OnInit {
  usuario: UsuarioDTO = {
    id: '',
    userName: '',
    email: ''
  };

  private route = inject(ActivatedRoute);
  private usuariosService = inject(UsuariosService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuariosService.obtenerPorId(id).subscribe((usuario) => {
        this.usuario = usuario;
      });
    }
  }
}
