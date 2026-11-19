import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'rural-app-front',
  webDir: 'www',
    server: {
    cleartext: true,
    androidScheme: 'http'   // usa http://localhost en vez de https://localhost
  },
    android: {
    // 🔴 CLAVE: permite contenido mixto (HTTP dentro de WebView)
    allowMixedContent: true
  }
};

export default config;
