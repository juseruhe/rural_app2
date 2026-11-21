import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  leafOutline,
  arrowForwardOutline,
  personAddOutline,
} from 'ionicons/icons';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private router = inject(Router);

  public themeService = inject(ThemeService);

  constructor() {
    addIcons({ leafOutline, arrowForwardOutline, personAddOutline });
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  toggleTheme() {
  const nextTheme = this.themeService.theme() === 'dark' ? 'light' : 'dark';
  this.themeService.setTheme(nextTheme);
}
}