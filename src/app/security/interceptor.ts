import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, mergeMap } from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { environment } from "src/enviroments/enviroments";
export class NotAuthenticatedError { }

@Injectable()
export class RsdataHttpInterceptor implements HttpInterceptor{

  constructor(private auth:AuthService,private route: Router){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     if (!req.url.includes('/auth/signin') && this.auth.isAccessTokenInvalido() && req.url.includes(environment.apiUrl)) {
      return from(this.auth.getNewAccessToken())
      .pipe(
        mergeMap(() => {
          if (this.auth.isAccessTokenInvalido()) {
            this.route.navigate(['/login'])
          }

          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          });

          return next.handle(req);
        })
        );
      }else if(req.url.includes(environment.apiUrl)){
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
      }
      return next.handle(req);
  }

}
