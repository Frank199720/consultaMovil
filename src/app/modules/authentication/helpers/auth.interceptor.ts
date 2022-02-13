import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
            let path=req.url;
            if(path){
                if(path.indexOf('apiperu')>=0){
                    const clonedReq = req.clone({
                        headers: req.headers.set('Authorization', 'Bearer ' + environment.tokenConsulta)
                    });
                    return next.handle(clonedReq).pipe(
                        tap(
                            succ => { },
                            err => {
                                if (err.status == 401){
                                    
                                }
                            }
                        )
                    )
                }
            }            
            
            
            
           
        
        else
            return next.handle(req.clone());
    }
}
