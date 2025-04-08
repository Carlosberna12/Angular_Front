import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UsuariosComponent } from './usuario/usuarios/usuarios.component';
import { UsuarioCrearComponent } from './usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { VerUsuarioComponent } from './usuario/ver-usuario/ver-usuario.component';
import { EmpleadoCrearComponent } from './empleados/empleado-crear/empleado-crear.component';
import { EmpleadoEditarComponent } from './empleados/empleado-editar/empleado-editar.component';
import { EmpleadoVerComponent } from './empleados/empleado-ver/empleado-ver.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', component: HomePageComponent, canActivate: [authGuard] },
  { path: 'usuario', component: UsuariosComponent, canActivate: [authGuard] },
  { path: 'usuario/crear', component: UsuarioCrearComponent, canActivate: [authGuard] },
  { path: 'usuario/editar/:id', component: EditarUsuarioComponent, canActivate: [authGuard] },
  { path: 'usuario/ver/:id', component: VerUsuarioComponent, canActivate: [authGuard] },
  { path: 'empleado/crear', component: EmpleadoCrearComponent, canActivate: [authGuard] },
  { path: 'empleado/editar/:id', component: EmpleadoEditarComponent, canActivate: [authGuard] },
  { path: 'empleado/ver/:id', component: EmpleadoVerComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
