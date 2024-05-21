import { Component, Input } from '@angular/core';
import { ICommitData } from '../../interfaces/commit-data.interface';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'commit-list',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, SearchBarComponent],
  template: `
    <div class="container mx-auto my-4">
      <ul role="list" class="divide-y divide-gray-100" *ngIf="commitList?.length; else emptyBlock">
        <li class="flex justify-between gap-x-6 py-5 min-w-0 truncate px-2" *ngFor="let commitData of commitList">
          <div class="flex items-center w-full sm:w-3/4 gap-x-4">
            <a href="{{commitData.author.html_url}}" target="_blank" *ngIf="commitData.author; else emptyImg">
              <img class="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="{{commitData.author.avatar_url}}"
                alt="{{commitData.author.login}}">
            </a>
            <ng-template #emptyImg>
              <img class="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="assets/images/empty-user.png" alt="no-user-img">
            </ng-template>
            <div class="w-3/4 sm:w-11/12" *ngIf="commitData.commit?.author">
              <a href="{{commitData.html_url}}" target="_blank">
                <p class="text-sm font-semibold leading-6 text-gray-900 truncate">{{commitData.commit.message}}</p>
              </a>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{commitData.commit.author.date | date}}</p>
            </div>
          </div>
          <div class="hidden sm:flex sm:flex-col sm:items-end min-w-0 w-1/4">
            <p class="text-sm leading-6 text-gray-900 11/12 truncate">{{commitData.commit.author.name}}</p>
            <p class="mt-1 text-xs leading-5 text-gray-500 11/12 truncate">{{commitData.commit.author.email}}</p>
          </div>
        </li>
      </ul>
    </div>
    <ng-template #emptyBlock>
      <div class="w-full h-96 text-1xl flex justify-center items-center">
        <h3>{{emptyMessage}}</h3>
      </div>
    </ng-template>
  `,
  styles: ''
})
export class CommitListComponent {
  @Input() commitList!: ICommitData[];
  @Input() emptyMessage: string = 'No hay commits para mostrar';
}
