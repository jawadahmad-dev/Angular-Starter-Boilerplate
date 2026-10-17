import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService, ConfirmationService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { loadingInterceptor } from './Core/Interceptors/loading-interceptor';
import { tokenInterceptor } from './Core/Interceptors/token-interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    }),
    provideHttpClient(withInterceptors([tokenInterceptor, loadingInterceptor])),
    provideAnimationsAsync(),
    MessageService,
    ConfirmationService,
    DialogService,
  ],
};
