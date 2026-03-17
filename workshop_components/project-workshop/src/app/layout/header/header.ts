import { Component } from '@angular/core';
import { Logo } from './logo/logo';
import { MiniBar } from './mini-bar/mini-bar';
import { NavBar } from './nav-bar/nav-bar';

@Component({
  selector: 'app-header',
  imports: [Logo, MiniBar, NavBar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
