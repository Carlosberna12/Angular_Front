import { Component, Input, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';
import { UsuarioDTO } from '../usuario';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {
  @Input() id!: string; // ID como string

  private fb = inject(FormBuilder);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  form = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
  

  ngOnInit() {
    if (this.id) {
      this.usuariosService.obtenerPorId(this.id).subscribe((usuario: UsuarioDTO) => {
        this.form.patchValue({
          userName: usuario.userName,
          email: usuario.email,
        });
      });
    }
  }

  guardarCambios() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuarioEditado = {
      userName: this.form.value.userName!,
      email: this.form.value.email!,
      password: 'Temporal123!'
    };

    this.usuariosService.actualizar(this.id, usuarioEditado).subscribe(() => {
      this.router.navigate(['/usuario']);
    });
  }
}
