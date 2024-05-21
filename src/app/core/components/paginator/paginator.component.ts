import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" *ngIf="totalCount>1">
      <div class="flex flex-1 justify-between sm:hidden">
          <button (click)="updateSelectedPage(currentPage-1)" [ngClass]="{'opacity-25 select-none': currentPage === 1}"
              class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
          <button (click)="updateSelectedPage(currentPage+1)" [ngClass]="{'opacity-25 select-none': currentPage === totalPagesArray.length}"
              class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
              <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{bottomResults}}</span>
                  to
                  <span class="font-medium">{{topResults}}</span>
                  of
                  <span class="font-medium">{{totalCount}}</span>
                  results
              </p>
          </div>
          <div>
              <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button (click)="updateSelectedPage(currentPage-1)"
                      class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      [ngClass]="{'opacity-25 select-none': currentPage === 1}">
                      <span class="sr-only">Previous</span>
                      <img class="h-5 w-5" src="assets/svg/previous.svg" alt="prev-arrow">
                  </button>
                  <button aria-current="page" *ngFor="let pageNumber of totalPagesArray; let index = index"
                      (click)="updateSelectedPage(index+1)"
                      class="relative inline-flex items-center px-4 py-2 text-sm font-semibold"
                      [ngClass]="(currentPage === index+1)
                          ? 'z-10 bg-sky-400 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'">
                      {{index+1}}
                  </button>
                  <button (click)="updateSelectedPage(currentPage+1)"
                      class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      [ngClass]="{'opacity-25 select-none': currentPage === totalPagesArray.length}">
                      <span class="sr-only">Next</span>
                      <img class="h-5 w-5" src="assets/svg/next.svg" alt="next-arrow">
                  </button>
              </nav>
          </div>
      </div>
    </div>`,
  styles: ''
})
export class PaginatorComponent implements OnChanges {
  @Input() totalCount: number = 0;
  @Input() perPage: number = 0;
  @Input() page: number = 0;
  @Output() pageUpdate: EventEmitter<number> = new EventEmitter();

  public totalPagesArray!: undefined[];
  public currentPage: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalCount']?.previousValue !== changes['totalCount']?.currentValue) {
      const total = +(this.totalCount / this.perPage).toFixed();
      if (total) {
        this.totalPagesArray = Array(total);
      }
    }
  }

  updateSelectedPage(page: number): void {
    if (page === 0 || page === this.totalPagesArray.length + 1) return;
    this.currentPage = page;
    this.pageUpdate.emit(page);
  }

  get bottomResults(): number {
    return ((this.perPage * this.page) - (this.perPage - 1));
  }

  get topResults(): number {
    return (this.perPage * this.page <= this.totalCount) ? this.perPage * this.page : this.totalCount;
  }
}
