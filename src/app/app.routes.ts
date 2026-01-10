import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { MengenmeldungListComponent } from './mengenmeldungen/mengenmeldung-list/mengenmeldung-list.component';
import { MengenmeldungFormComponent } from './mengenmeldungen/mengenmeldung-form/mengenmeldung-form.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'mengenmeldungen',
        loadComponent: () =>
          import('./mengenmeldungen/mengenmeldung-list/mengenmeldung-list.component').then(
            (m) => m.MengenmeldungListComponent
          ),
      },
      {
        path: 'mengenmeldungen/new',
        component: MengenmeldungFormComponent,
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
