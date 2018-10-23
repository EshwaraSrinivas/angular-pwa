import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, empty, of } from 'rxjs';
import { map, catchError} from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticationSubject = new BehaviorSubject<boolean>(false);
  private accessCheck:boolean = false;

  get authentication(){
    return this.authenticationSubject.asObservable();
  }

  isAuthenticated(){
    return this.accessCheck;
  }

  constructor(private httpClient: HttpClient) { }

  authenticate(): Observable<boolean>{
    if(environment.auth_url != ""){
       return this.httpClient.get<boolean>(environment.auth_url)
      .pipe(map(data => {
        this.accessCheck = true;
        this.authenticationSubject.next(true);
        return this.accessCheck;
      }), catchError(error => {        
        return empty();
      }));
    }
    else{
      return of(true);
    }
  }
}

