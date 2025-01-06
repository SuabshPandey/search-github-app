import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoService } from '../../service/repo.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar, faCodeBranch, faExclamationCircle, faClock, faCode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-repo-detail',
  imports: [CommonModule, DatePipe, FontAwesomeModule],
  templateUrl: './repo-detail.component.html',
  styleUrl: './repo-detail.component.scss'
})
export class RepoDetailComponent implements OnInit {

  repoName: string | null = null;
  ownerName: string | null = null;
  repoDetails: any = {
    owner: {
      login: 'Subash Pandey',
      avatar_url: '/images/test-github.jpeg',
    },
    name: 'Sh Furniture Udhyog',
    description: 'hellloooooooooooooooo',
    created_at: '',
    updated_at: '',
  };

  constructor(private route: ActivatedRoute, private repoService: RepoService, library: FaIconLibrary) {
    library.addIcons(faStar, faCodeBranch, faExclamationCircle, faClock, faCode);
  }

  ngOnInit(): void {

    this.repoName = this.route.snapshot.paramMap.get('repo');

    this.ownerName = this.route.snapshot.paramMap.get('owner');

    console.log("rpute params", this.route.snapshot.paramMap);

    console.log("rep name", this.ownerName);


    console.log("Repo Name", this.repoName);

    if (this.ownerName && this.repoName) {
      this.fetchRepoDetails(this.ownerName, this.repoName);
    }
  }


  fetchRepoDetails(owner: string, repo: string) {
    this.repoService.getRepoDetails(owner, repo).subscribe({
      next: (res) => {
        console.log("Response from repo details api", res?.owner);
        this.repoDetails = res;
      },
      error: (err) => {
        console.log("Error", err);
      }
    })
  }


}
