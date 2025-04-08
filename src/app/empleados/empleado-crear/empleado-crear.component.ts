import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { EmpleadoCreacionDTO } from '../empleado.';

@Component({
  selector: 'app-empleado-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './empleado-crear.component.html',
  styleUrl: './empleado-crear.component.css'
})
export class EmpleadoCrearComponent {
  router = inject(Router);
  fb = inject(FormBuilder);

  private empleadosService = inject(EmpleadosService);

  form = this.fb.group({
    nombre: ['', Validators.required],
    fechaIngreso: ['', Validators.required],
    sueldo: ['', [Validators.required, Validators.min(0)]],
  });

  guardarEmpleado() {
    if (this.form.invalid) return;

    const empleado: EmpleadoCreacionDTO = {
      nombre: this.form.value.nombre ?? '',
      fechaIngreso: new Date(this.form.value.fechaIngreso ?? ''),
      sueldo: Number(this.form.value.sueldo ?? 0)
    };

    this.empleadosService.crearEmpleado(empleado).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error al crear el empleado:', err);
      }

    });
  }

}