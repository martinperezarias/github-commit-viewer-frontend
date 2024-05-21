import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'custom-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <header class="bg-white absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex">
          <a class="-m-1.5 p-1.5">
            <img class="h-12 w-auto" src="assets/images/ftf-logo.png" alt="">
          </a>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Fulltimeforce - Technical task</h1>
        </div>
        <div></div>
      </nav>
    </header>`,
  styles: ''
})
export class HeaderComponent { }
