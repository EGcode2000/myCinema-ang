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
  export class AdminGuard implements CanActivate {
    constructor(private usersService: UsersService, private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAdmin = this.usersService.getIsAdmin();
      if (!isAdmin) {
        //alert('can not activate gured! only admin!');
        this.usersService.updateReturnUrl(state.url);
        this.router.navigate(['/login']);
      }
      return isAdmin;
    }
  }
  