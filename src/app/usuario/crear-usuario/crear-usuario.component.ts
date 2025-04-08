import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { UsuarioCreacionDTO, UsuarioDTO } from '../usuario';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';


@Component({
  selector: 'app-usuario-crear',
  standalone: true,
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatCard,
    MatCardTitle,
    MatCardContent
  ]
})
export class UsuarioCrearComponent {
  private fb = inject(FormBuilder);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  form = this.fb.group({
    userName: this.fb.control<string>('', Validators.required),
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', Validators.required)
  });


  guardar() {
    if (this.form.invalid) return;

    const usuario: UsuarioCreacionDTO = {
      userName: this.form.value.userName ?? '',
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? ''
    };

    this.usuariosService.crear(usuario).subscribe(() => {
      this.router.navigate(['/usuario']);
    });
  }

}