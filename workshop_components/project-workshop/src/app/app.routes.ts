import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Logout } from './features/logout/logout';
import { Newtheme } from './features/newtheme/newtheme';
import { Demo } from './features/demo/demo';
import { NotFound } from './features/not-found/not-found/not-found';
import { PostDetailComponent } from './features/demo/themes/post-detail/post-detail'; 
import { authGuard } from './core/quards/auth-guard';
import { Register } from './features/auth/register/register';
import { ThemeContent } from './features/themes/theme-content/theme-content';
import { ThemesList } from './features/themes/themes-list/themes-list';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'themes', component: ThemesList, canActivate: [authGuard] },
  { path: 'themes/:id', component: ThemeContent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'newtheme', component: Newtheme },
  { path: 'demo', component: Demo },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'register', component: Register },
  //{ path: '**', redirectTo: '/home' },
  { path: '**', component: NotFound },
];
