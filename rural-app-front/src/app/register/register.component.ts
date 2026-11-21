import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
  IonText,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  leafOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner,
    IonText,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private toastCtrl = inject(ToastController);

  isSubmitting = false;

  registerForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public themeService = inject(ThemeService)

  constructor() {
    addIcons({
      personOutline,
      mailOutline,
      lockClosedOutline,
      leafOutline,
      checkmarkCircleOutline,
    });
  }

  get fullName() {
    return this.registerForm.controls.fullName;
  }
  get email() {
    return this.registerForm.controls.email;
  }
  get password() {
    return this.registerForm.controls.password;
  }

    toggleTheme() {
    // Alterna entre claro y oscuro
    const nextTheme = this.themeService.theme() === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(nextTheme);
  }

  async onSubmit() {
    if (this.registerForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;

    try {
      // TODO: reemplaza con tu servicio real (AuthService, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const toast = await this.toastCtrl.create({
        message: '¡Cuenta creada con éxito!',
        duration: 2000,
        color: 'success',
        position: 'top',
        icon: 'checkmark-circle-outline',
      });
      await toast.present();

      this.registerForm.reset();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Ocurrió un error. Intenta de nuevo.',
        duration: 2500,
        color: 'danger',
        position: 'top',
      });
      await toast.present();
    } finally {
      this.isSubmitting = false;
    }
  }
}