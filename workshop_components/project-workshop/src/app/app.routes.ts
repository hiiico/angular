import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Logout } from './features/logout/logout';
import { ThemeDetailComponent } from './features/themes/theme-detail/theme-detail';
import { Themes } from './features/themes/themes';
import { Newtheme } from './features/newtheme/newtheme';
import { NotFound } from './features/not-found/not-found/not-found';
import { PostDetailComponent } from './features/themes/post-detail/post-detail';
import { themeDetailResolver } from './features/themes/theme-detail/theme-detail.resolver';
import { authGuard } from './core/quards/auth-guard';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'themes', component: Themes,/* canActivate: [authGuard] */},
  { path: 'themes/:id', component: ThemeDetailComponent, resolve: { theme: themeDetailResolver } },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'newtheme', component: Newtheme },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'register', component: Register },
  // { path: '**', redirectTo: '/home' },
  { path: '**', component: NotFound },
];
