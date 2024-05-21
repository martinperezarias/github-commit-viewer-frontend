import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { LoaderService } from "../services/loader.service";

export const loaderInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const loaderService = inject(LoaderService);
  loaderService.isLoading.next(true);
  return next(req).pipe(finalize(() => loaderService.isLoading.next(false)));
};