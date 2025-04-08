import { Component, inject, OnInit } from '@angular/core';
import { ListaempleadosComponent } from '../empleados/listaempleados/listaempleados.component';
import { EmpleadosService } from '../empleados/empleados.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ListaempleadosComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  cargando = true;
  empleadosList: any[] = [];

  empleadosService = inject(EmpleadosService);

  ngOnInit(): void {
    setTimeout(() => {
      this.empleadosService.obtenerEmpleados().subscribe(empleados => {
        this.empleadosList = empleados;
      });
      this.cargando = false;
    }, 1000);
  }
}
