import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonButton } from '@ionic/angular/ion-button';
import { IonItem } from '@ionic/angular/ion-item';
import {IonInput} from '@ionic/angular/ion-input';

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

    this.authService.register(this.registerForm.value).subscribe({
      next: async (res) => {
        this.isSubmitting = false;
        this.registerForm.reset();
        await this.showToast(res.message, 'success');
      },
      error: async (err) => {
        this.isSubmitting = false;
        const msg = err.error?.message || 'No se pudo conectar con el servidor';
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
