import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Logout } from './features/logout/logout';
import { NewThemeComponent} from './features/new-theme/new-theme'
import { Demo } from './features/demo/demo';
import { NotFound } from './features/not-found/not-found/not-found';
import { PostDetailComponent } from './features/demo/themes/post-detail/post-detail';
import { AuthGuard } from './core/quards/auth-guard';
import { Register } from './features/auth/register/register';
import { ThemeContent } from './features/themes/theme-content/theme-content';
import { ThemesList } from './features/themes/themes-list/themes-list';
import {ProfileComponent} from './features/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'themes', component: ThemesList, canActivate: [AuthGuard] },
  { path: 'themes/:id', component: ThemeContent , canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'new-theme', component: NewThemeComponent},
  { path: 'demo', component: Demo },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'register', component: Register },
  //{ path: '**', redirectTo: '/home' },
  { path: '**', component: NotFound },
];
