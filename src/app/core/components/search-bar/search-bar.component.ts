import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProjectForm } from '../../interfaces/project-form.interface';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
  ],
  template: `
    <div class="bg-white shadow">
    <form [formGroup]="projectForm">
      <div
        class="w-full flex flex-col sm:flex-row sm:gap-x-12 gap-y-4 sm:justify-between justify-center items-start px-4 py-3 sm:px-6 lg:px-8">
        <h3 class="text-1xl font-bold tracking-tight text-gray-900 mt-1">Commit Viewer</h3>

        <div class="flex flex-col sm:items-center w-full sm:w-1/4">
          <div
            class="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-400"
            [ngClass]="{'ring-red-500 focus-within:ring-red-400': usernameError}">
            <img class="pl-2" src="assets/svg/user.svg" alt="user">
            <input type="text" formControlName="username"
              class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none"
              [ngClass]="{'placeholder:text-red-500': usernameError}" placeholder="GitHub username">
          </div>
          <span class="flex items-center tracking-wide text-red-500 text-xs mt-1" *ngIf="usernameError">
            Mandatory field if repo is completed
          </span>
        </div>

        <div class="flex flex-col sm:items-center w-full sm:w-1/4">
          <div
            class="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-400"
            [ngClass]="{'ring-red-500 focus-within:ring-red-400': repoError}">
            <img class="pl-2" src="assets/svg/repo.svg" alt="">
            <input type="text" formControlName="repo"
              class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none"
              [ngClass]="{'placeholder:text-red-500': repoError}" placeholder="Repository name">
          </div>
          <span class="flex items-center tracking-wide text-red-500 text-xs mt-1" *ngIf="repoError">
            Mandatory field if user is completed
          </span>
        </div>

        <button (click)="sendRequest()" type="button" [disabled]="projectForm.invalid"
          class="flex justify-center gap-1 text-centerinline-flex sm:w-fit w-full items-center rounded-md px-2 py-1.5 text-black-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50">
          <img src="assets/svg/search.svg" alt="search-icon">
          Search
        </button>
      </div>
    </form>
  </div>
  `,
})

export class SearchBarComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public projectForm = this.formBuiler.group({
    username: [''],
    repo: ['']
  });

  @Output() emitSearch = new EventEmitter<IProjectForm>();

  constructor(
    private formBuiler: FormBuilder
  ) {
    this.updateValidators(this.usernameControl, this.repoControl);
    this.updateValidators(this.repoControl, this.usernameControl);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
  }

  private updateValidators(toLister: FormControl, toUpdateValidators: FormControl): void {
    this.subscriptions.push(
      toLister.valueChanges.subscribe((value) => {
        value
        ? toUpdateValidators.setValidators(Validators.required)
        : toUpdateValidators.clearValidators();
        toUpdateValidators.updateValueAndValidity({ emitEvent: false });
      })
    );
  }

  sendRequest(): void {
    if (this.projectForm.invalid) return;
    this.emitSearch.emit((this.projectForm.value as IProjectForm));
  }

  get usernameControl(): FormControl {
    return this.projectForm.controls.username;
  }

  get repoControl(): FormControl {
    return this.projectForm.controls.repo;
  }

  get usernameError(): boolean {
    return this.usernameControl.errors ? this.usernameControl.errors['required'] : false;
  }

  get repoError(): boolean {
    return this.repoControl.errors ? this.repoControl.errors['required'] : false;
  }
}
