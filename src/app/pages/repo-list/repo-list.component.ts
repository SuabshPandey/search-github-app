import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RepoService } from '../../service/repo.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-repo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.scss',


})
export class RepoListComponent implements OnInit {
  selectedSortOption: string = 'stars';
  searchQuery: string = '';
  repos: any[] = [];

  constructor(private repoService: RepoService) { }

  ngOnInit() {
    // this.repoService.getTest().subscribe({
    //   next: (res) => {

    //     this.repos = res
    //   },
    //   error: (err) => {
    //     console.log("Error", err);
    //   }
    // })


  }
  onSearch() {
    console.log("Search Term", this.searchQuery);

    this.repoService.getRepoList(this.searchQuery, 1, 10, 'stars', 'desc').subscribe({
      next: (res) => {
        console.log("Response from repo api", res);
        this.repos = res?.items
      },
      error: (err) => {
        console.log("Error", err);
      }
    })



  }

  onSort(event: any) {
    console.log("Sort Event", event);
    console.log("Sort Event Value", event?.target?.value);

  }

}
