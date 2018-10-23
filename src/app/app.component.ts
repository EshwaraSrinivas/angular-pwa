import { Component, OnInit } from '@angular/core';
import { SwUpdate} from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-pwa';
  isLoggedIn:Observable<boolean>;

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar, private authService: AuthService){
  }

  ngOnInit(){
    this.isLoggedIn = this.authService.authentication;
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(()=>{
        const snack = this.snackBar.open('Update Available', 'Reload');
        snack.onAction().subscribe(()=>{
          window.location.reload();
        });
        snack._dismissAfter(10000);
      });
    }
  }


}