import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoService } from '../../service/repo.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from '../../common/loader/loader.component';
@Component({
  selector: 'app-repo-detail',
  imports: [CommonModule, DatePipe, LoaderComponent],
  templateUrl: './repo-detail.component.html',
  styleUrl: './repo-detail.component.scss'
})
export class RepoDetailComponent implements OnInit {
  isLoading: boolean = false;
  repoName: string | null = null;
  ownerName: string | null = null;
  repoDetails: any;

  constructor(private route: ActivatedRoute, private repoService: RepoService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.repoName = this.route.snapshot.paramMap.get('repo');
    this.ownerName = this.route.snapshot.paramMap.get('owner');

    if (this.ownerName && this.repoName) {
      this.fetchRepoDetails(this.ownerName, this.repoName);
    }
  }


  fetchRepoDetails(owner: string, repo: string) {
    this.repoService.getRepoDetails(owner, repo).subscribe({
      next: (res) => {
        this.repoDetails = res;
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false;
        console.log("Error", err);

      }
    })
  }


}
