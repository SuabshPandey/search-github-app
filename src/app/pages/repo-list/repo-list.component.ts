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

  // Pagination related variables
  currentPage: number = 1;
  totalPages: number = 0;
  totalResults: number = 0;
  perPage: number = 10;

  constructor(private repoService: RepoService) { }

  ngOnInit() {
  }
  onSearch() {
    console.log("Search Term", this.searchQuery);
    this.currentPage = 1;
    this.fetchRepos();

  }

  fetchRepos() {
    this.isLoading = true;
    this.repoService.getRepoList(this.searchQuery, this.currentPage, this.perPage, this.selectedSortOption, 'desc').subscribe({
      next: (res) => {
        console.log("Response from repo api", res?.items);
        this.repos = res?.items;
        this.totalResults = res?.total_count;
        this.totalPages = Math.ceil(this.totalResults / this.perPage);
        this.isLoading = false
      },
      error: (err) => {
        this.repos = [];
        this.totalResults = 0;
        this.totalPages = 0;
        this.isLoading = false
      }
    })
  }

  nextPage() {
    console.log("Current page on next", this.currentPage);

    if(this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchRepos();
    }
  }

  prevPage() {
    console.log("Current page on prev", this.currentPage);
    if(this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepos();
    }
  }

  onSort(event: any) {
    console.log("Sort Event", event);
    console.log("Sort Event Value", event?.target?.value);
    this.selectedSortOption = event?.target?.value;
    this.currentPage = 1;
    this.fetchRepos();

  }





}
