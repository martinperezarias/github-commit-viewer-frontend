import { Routes } from '@angular/router';
import { CommitPageComponent } from './core/pages/commit-page/commit-page.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'commit-page'},
    {path: 'commit-page', component: CommitPageComponent}
];
