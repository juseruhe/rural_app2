import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Cada vez que cambie el signal, aplicamos el tema
    effect(() => {
      this.applyTheme(this.theme());
    });

    // Escuchar cambios del sistema si está en modo 'system'
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (this.theme() === 'system') {
        this.applyTheme('system');
      }
    });
  }

  setTheme(newTheme: Theme) {
    this.theme.set(newTheme);
    localStorage.setItem('app-theme', newTheme);
  }

  private getInitialTheme(): Theme {
    return (localStorage.getItem('app-theme') as Theme) || 'system';
  }

  private applyTheme(theme: Theme) {
    const isDark = theme === 'dark' || 
                  (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}