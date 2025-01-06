import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RepoService } from '../../service/repo.service';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-repo-list',
  imports: [CommonModule, FormsModule, RouterModule],
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

  private searchQuerySubject: Subject<string> = new Subject();

  constructor(private repoService: RepoService) {

  }

  ngOnInit() {

    this.searchQuerySubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((searchQuery) => {
      this.currentPage = 1;
      this.fetchRepos();
    })


  }
  onSearch(event: Event) {
    console.log("event", event);
    if(event !== null){
    this.searchQuerySubject.next(this.searchQuery);
    }

  }

  fetchRepos() {
    this.isLoading = true;
    this.repoService.getRepoList(this.searchQuery, this.currentPage, this.perPage, this.selectedSortOption, 'desc').subscribe({
      next: (res) => {
        this.repos = res?.items;
        this.totalResults = res?.total_count;
        this.totalPages = Math.ceil(this.totalResults / this.perPage);
        this.isLoading = false
      },
      error: (err) => {
        this.repos = [];
        this.selectedSortOption = 'stars';
        this.totalResults = 0;
        this.totalPages = 0;
        this.isLoading = false
      }
    })
  }

  onSort(event: any) {
    this.selectedSortOption = event?.target?.value;
    this.currentPage = 1;
    this.fetchRepos();

  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchRepos();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepos();
    }
  }

  onResultsPerPageChange(event: any) {
    this.perPage = event.target.value;
    this.currentPage = 1;
    this.fetchRepos();
  }


}
