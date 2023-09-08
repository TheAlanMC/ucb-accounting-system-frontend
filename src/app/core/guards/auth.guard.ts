import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // El usuario no está autenticado, por lo que se le pide que inicie sesión.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    // Obtener los roles requeridos de la ruta.
    const requiredRoles = route.data['roles'];

    // Permitir el acceso si no se requieren roles.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    const authorized = requiredRoles.every((role) => this.roles.includes(role));
    if (!authorized) this.router.navigate(['error'])

    // Comprobar si el usuario tiene todos los roles requeridos.
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}