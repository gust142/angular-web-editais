import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    provideHttpClient(), provideAnimationsAsync(), NG_EVENT_PLUGINS
  ]
};
