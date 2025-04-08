export interface EmpleadoCreacionDTO {
    nombre: string;
    fechaIngreso: Date;
    sueldo: number;

}

export interface EmpleadoDTO extends EmpleadoCreacionDTO {
    id: number;
}
