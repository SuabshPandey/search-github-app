import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RepoService } from '../../service/repo.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-repo-list',
  imports: [CommonModule, FormsModule, RouterModule,],
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.scss',


})
export class RepoListComponent implements OnInit {
  isLoading: boolean = false;
  selectedSortOption: string = 'stars';
  searchQuery: string = '';
  repos: any[] = [];

  constructor(private repoService: RepoService) { }

  ngOnInit() {
  }
  onSearch() {
    console.log("Search Term", this.searchQuery);
    this.isLoading = true;
    this.repoService.getRepoList(this.searchQuery, 1, 10, 'stars', 'desc').subscribe({
      next: (res) => {
        console.log("Response from repo api", res);
        this.repos = res?.items
        this.isLoading = false
      },
      error: (err) => {
        console.log("Error", err);
        this.isLoading = false
        this.repos = []
      }
    })
  }

  onSort(event: any) {
    console.log("Sort Event", event);
    console.log("Sort Event Value", event?.target?.value);

  }





}
