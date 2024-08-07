import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JWTTokenService } from './service/jwttoken.service';
import { AppService } from './service/app.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const jwtTokenService = inject(JWTTokenService);
  const router  = inject(Router);
  const appService = inject(AppService);

  // const role = jwtTokenService.getRole();
  const roles = appService.userLogged().roles;
  const expectedRoles = route.data['expectedRoles'];

  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (expectedRoles.includes(roles[i].name)) {
        return true;
      }
    }
  }
  return router.createUrlTree(['unauthorized']);


  // if (!role || !expectedRoles.includes(role)) {
  //   return router.createUrlTree(['unauthorized']);
  // }
  // else {
  //   return true;
  // }
};

interface Role {
  id:number,
  name:string
}
