import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = localStorage.getItem('name');
    if (user) {
      return true;
    } else {
      this.router.navigate(["login"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }
}
