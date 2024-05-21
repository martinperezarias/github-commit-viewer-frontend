import { Component, OnInit } from '@angular/core';
import { CommitService } from '../../services/commit.service';
import { IApiResponse } from '../../interfaces/api-response.interface';
import { ICommitData } from '../../interfaces/commit-data.interface';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CommitListComponent } from '../../components/commit-list/commit-list.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProjectForm } from '../../interfaces/project-form.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ICommitRequest } from '../../interfaces/commit-request.interface';

@Component({
  selector: 'commit-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    CommitListComponent,
    PaginatorComponent,
  ],
  template: `
    <search-bar (emitSearch)="patchAndSearch($event)"></search-bar>
    <commit-list [commitList]="commitList" [emptyMessage]="emptyMessage"></commit-list>
    <paginator [perPage]="perPage" [page]="page" [totalCount]="totalCount" (pageUpdate)="pageUpdate($event)"><paginator>
  `
})
export class CommitPageComponent implements OnInit {
  public commitList!: ICommitData[];
  public totalCount: number = 0;
  public emptyMessage!: string;


  public viewerForm: FormGroup = this.formBuilder.group({
      username: new FormControl<string>(''),
      repo: new FormControl<string>(''),
      perPage: new FormControl<number>(15, Validators.required),
      page: new FormControl<number>(1, Validators.required),
    });

  constructor(
    private formBuilder: FormBuilder,
    private commitService: CommitService
  ) { }

  ngOnInit(): void {
    this.getAllCommits();
  }

  patchAndSearch(form: IProjectForm): void {
    this.viewerForm.patchValue({
      username: form.username,
      repo: form.repo,
      page: 1
    })
    this.getAllCommits();
  }

  public pageUpdate(page: number): void {
    this.viewerForm.controls['page'].patchValue(page);
    this.getAllCommits();
  }

  public getAllCommits(): void {
    if (!this.viewerForm.valid) return;
    const payload: ICommitRequest = this.viewerForm.value;
    this.commitService.getAllCommits(payload).subscribe({
      next: this.handleGetSuccess.bind(this),
      error: this.handleError.bind(this)
    })
  }

  private handleGetSuccess(res: IApiResponse<ICommitData[]>) {
    if (res.success) {
      this.commitList = res.data;
      const { totalCount, perPage, page } = res.info;
      this.totalCount = totalCount || 0;
      this.viewerForm.patchValue({
        perPage: perPage || 0,
        page: page || 0
      })
    } else {

    }
  }

  private handleError(e: HttpErrorResponse) {
    this.emptyMessage = (e.status === 404)
      ? 'No se han encontrado repositorios con los datos ingresados'
      : 'Ha ocurrido un error, intenta nuevamente más tarde';
    this.totalCount = 0;
    this.commitList = [];
  }

  get page(): number {
    return this.viewerForm.controls['page'].value ?? 0;
  }

  get perPage(): number {
    return this.viewerForm.controls['perPage'].value ?? 0;
  }
}
