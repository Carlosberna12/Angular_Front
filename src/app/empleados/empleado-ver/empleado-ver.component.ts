import { Component, Input, effect, inject } from '@angular/core';
import { numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { EmpleadosService } from '../empleados.service';
import { EmpleadoDTO } from '../empleado.'; 

@Component({
  selector: 'app-empleado-ver',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './empleado-ver.component.html',
  styleUrl: './empleado-ver.component.css'
})
export class EmpleadoVerComponent {
  @Input({ transform: numberAttribute }) id!: number;

  empleadosService = inject(EmpleadosService);

  empleado: EmpleadoDTO | null = null;

  constructor() {
    effect(() => {
      if (this.id) {
        this.empleadosService.obtenerEmpleadoPorId(this.id).subscribe((res) => {
          this.empleado = res;
        });
      }
    });
  }
}
