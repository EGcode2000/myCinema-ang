import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { UsersService } from './users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.usersService.getIsAuth();
    if (!isAuth) {
      //alert('can not activate gured!');
      //alert(state.url);
      //updating return url in user service
      this.usersService.updateReturnUrl(state.url);
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
