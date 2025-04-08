import { Component, Input, effect, inject } from '@angular/core';
import { numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { EmpleadosService } from '../empleados.service';
import { Router } from '@angular/router';
import { EmpleadoCreacionDTO } from '../empleado.';

@Component({
  selector: 'app-empleado-editar',
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
  templateUrl: './empleado-editar.component.html',
  styleUrl: './empleado-editar.component.css'
})
export class EmpleadoEditarComponent {
  @Input({ transform: numberAttribute }) id!: number;

  fb = inject(FormBuilder);
  empleadosService = inject(EmpleadosService);
  router = inject(Router);

  form = this.fb.group({
    nombre: this.fb.control<string>('', Validators.required),
    fechaIngreso: this.fb.control<Date | null>(null, Validators.required),
    sueldo: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
    imagen: this.fb.control<string>(''),
  });

  constructor() {
    effect(() => {
      if (this.id) {
        this.empleadosService.obtenerEmpleadoPorId(this.id).subscribe((res) => {
          this.form.patchValue(res);
        });
      }
    });
  }

  guardarCambios() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const empleado: EmpleadoCreacionDTO = {
      nombre: this.form.value.nombre ?? '',
      fechaIngreso: this.form.value.fechaIngreso ?? new Date(),
      sueldo: this.form.value.sueldo ?? 0,
    };

    this.empleadosService.actualizarEmpleado(this.id, empleado).subscribe(() => {
      this.router.navigate(['/empleados']);
    });
  }

}