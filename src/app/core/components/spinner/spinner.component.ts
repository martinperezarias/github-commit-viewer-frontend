import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
  <ng-container *ngIf="loaderService.isLoading.value">
    <div class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 flex justify-center items-center">
      <img class="animate-spin" src="assets/svg/spinner.svg" alt="loader-spinner">
    </div>
  </ng-container>`,
  styles: '',
})
export class SpinnerComponent {
  constructor(public loaderService: LoaderService) { }
}
