import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injector } from '@angular/core';
import { UserAuthService } from '../Services/user-auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: any) => {
  if (route.routeConfig && route.routeConfig.providers) {
    const injector: Injector = Injector.create({providers: []});
    const authService: UserAuthService = injector.get(UserAuthService);
    const router: Router = injector.get(Router);

    if (authService.isUserLogged) {
      return true;
    } else {
      alert('ddd');
      router.navigateByUrl('/login');
      return false;
    }
  }

  return false;
};