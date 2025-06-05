import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationServerService } from './authorization-server.service';
import { GlobalService } from './global.service';
 
 

@Injectable({ providedIn: 'root' })
export class CheckRoutePrivilegios implements CanActivateChild {

    constructor(private readonly router: Router, 
                private readonly globalService: GlobalService, 
                private readonly authorizationServerService: AuthorizationServerService) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (!this.globalService.CurrentUser && state.root.queryParams["prmToken"]) {
            return this.authorizationServerService.LoginRemoteSession(state.root.queryParams["prmToken"], state.url);
        }

        else {
            if (this.globalService.CheckRoute(state.url)) {
                return true;
            }
            else {
                return this.router.parseUrl('/accessdenied');
            }

        }
    }
}
