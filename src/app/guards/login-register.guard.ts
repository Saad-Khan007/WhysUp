import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const auth = getAuth();
    return new Promise<boolean>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.router.navigate(['user/profile']); 
          resolve(false);
          console.log('auth state changed1');
        } else {
          resolve(true);
        }
      });
    });
  }

}
