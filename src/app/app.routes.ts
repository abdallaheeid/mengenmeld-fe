import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { MengenmeldungListComponent } from './mengenmeldungen/mengenmeldung-list/mengenmeldung-list.component';
import { MengenmeldungFormComponent } from './mengenmeldungen/mengenmeldung-form/mengenmeldung-form.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'mengenmeldung', component: MengenmeldungListComponent },
      { path: 'mengenmeldungen/new', component: MengenmeldungFormComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
