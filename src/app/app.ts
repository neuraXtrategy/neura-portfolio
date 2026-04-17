import { Component } from '@angular/core';
import { Initial } from './landing/pages/initial/initial';

@Component({
  selector: 'app-root',
  imports: [Initial],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
