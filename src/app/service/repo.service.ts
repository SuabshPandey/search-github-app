import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private http: HttpClient) { }

  getRepoList(searchQuery: string, page: number = 1, perPage: number = 10, sort: string = '', order: string = 'desc'): Observable<any> {

    const queryParams = new URLSearchParams({
      q: searchQuery,
      page: page.toString(),
      per_page: perPage.toString(),
      sort: sort,
      order: order
    })
    return this.http.get(`${environment.API_URL}/search/repositories?${queryParams}`)
  }
  getRepoDetails(owner: string, repo: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/repos/${owner}/${repo}`)
  }

}
