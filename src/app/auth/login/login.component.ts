import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
        MatIcon,
    MatCard,
    MatCardTitle,
    MatCardContent
    ],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);

    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });

    login() {
        if (this.form.invalid) return;

        const credenciales = {
            email: this.form.value.email ?? '',
            password: this.form.value.password ?? ''
        };

        this.authService.login(credenciales).subscribe({
            next: (respuesta) => {
                this.authService.guardarToken(respuesta.token);
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error('Error de login:', err);
                alert('Credenciales incorrectas');
            }
        });
    }

}
