import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonButton } from '@ionic/angular/ion-button';
import { IonItem } from '@ionic/angular/ion-item';
import {IonInput} from '@ionic/angular/ion-input';
import { timeout, finalize, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {IonContent} from '@ionic/angular/ion-content'; 
import {IonTitle} from '@ionic/angular/ion-title';
import {IonHeader} from '@ionic/angular/ion-header';
import {IonToolbar} from '@ionic/angular/ion-toolbar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonItem, IonInput, IonContent,
     IonTitle, IonHeader, IonToolbar ],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;
    this.isSubmitting = true;

    // Log para confirmar que el botón sí dispara la petición
    console.log('🚀 Iniciando registro...', this.registerForm.value);

    this.authService.register(this.registerForm.value).pipe(
      timeout(15000), // ⏱️ Si en 15s no hay respuesta, cancela la petición
      catchError((err) => {
        console.error('❌ Error de red o timeout:', err);
        // Si es un timeout o error de red (status 0)
        if (err.name === 'TimeoutError' || err.status === 0) {
          return throwError(() => new Error('El servidor no responde. Revisa tu conexión.'));
        }
        return throwError(() => err);
      }),
      // 🔄 finalize SIEMPRE se ejecuta, haya éxito o error. Apaga el spinner.
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe({
      next: async (res) => {
        console.log('✅ Registro exitoso:', res);
        this.registerForm.reset();
        await this.showToast(res.message || 'Registro exitoso', 'success');
      },
      error: async (err) => {
        console.error('🛑 Error final:', err);
        // Validamos si el error viene de nuestra validación de red o del backend
        const msg = err.message || err.error?.message || 'No se pudo conectar con el servidor';
        await this.showToast(msg, 'danger');
      }
    });
  }
  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000, color });
    await toast.present();
  }

  ngOnInit() {}
}
