import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { adminRoutes } from './admin/admin.routes';
import { clientRoutes } from './client/client.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideRouter(adminRoutes), provideRouter(clientRoutes), provideHttpClient()]
};
