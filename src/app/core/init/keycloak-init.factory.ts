import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment.development";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.KEYCLOAK_URL,
        realm: environment.KEYCLOAK_REALM,
        clientId: environment.KEYCLOAK_CLIENTID,
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
        }
      
    });
}
