import { Component, Input, ViewChild, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EmpleadosService } from '../empleados.service';
import { ConfirmDialogComponent } from './confim.component'; // ajusta si está en otra ruta

@Component({
  selector: 'app-listaempleados',
  standalone: true,
  imports: [
    DatePipe, UpperCasePipe, CurrencyPipe,
    MatTableModule, MatButtonModule, MatIconModule,
    MatCardModule, MatProgressSpinnerModule, MatTable,
    MatDialogModule, RouterLink, ConfirmDialogComponent
  ],
  templateUrl: './listaempleados.component.html',
  styleUrl: './listaempleados.component.css'
})
export class ListaempleadosComponent {
  @Input({ required: true }) empleados: any[] = [];
  @ViewChild(MatTable) tabla!: MatTable<any>;

  private empleadosService = inject(EmpleadosService);
  private dialog = inject(MatDialog);

  eliminarEmpleado(empleado: any) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { nombre: empleado.nombre }
    }).afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.empleadosService.eliminarEmpleado(empleado.id).subscribe(() => {
          const index = this.empleados.findIndex(e => e.id === empleado.id);
          if (index !== -1) {
            this.empleados.splice(index, 1);
            this.tabla.renderRows();
          }
        });
      }
    });
  }
}
