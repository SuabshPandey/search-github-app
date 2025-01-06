import { Routes } from '@angular/router';
import { RepoListComponent } from './pages/repo-list/repo-list.component';
import { RepoDetailComponent } from './pages/repo-detail/repo-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: RepoListComponent },
    { path: 'details/:owner/:repo', component: RepoDetailComponent }
];
