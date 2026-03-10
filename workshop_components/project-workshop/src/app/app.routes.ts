import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Themes } from './features/themes/themes';
import { Newtheme } from './features/newtheme/newtheme';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'themes', component: Themes },
  { path: 'newtheme', component: Newtheme },
  { path: '**', redirectTo: '/home' },
];
