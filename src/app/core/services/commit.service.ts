import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { IApiResponse } from '../interfaces/api-response.interface';
import { ICommitData } from '../interfaces/commit-data.interface';
import { ICommitRequest } from '../interfaces/commit-request.interface';

@Injectable({
  providedIn: 'root'
})
export class CommitService {

  constructor(private httpClient: HttpClient) { }

  public getAllCommits(payload: ICommitRequest): Observable<IApiResponse<ICommitData[]>>{
    return this.httpClient.post<IApiResponse<ICommitData[]>>(`${environment.apiUrl}commit/get-all`, payload);
  }
}
