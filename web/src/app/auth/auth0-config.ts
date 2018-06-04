import { environment } from "../../environments/environment";

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: "TSWTGq6o5dDKUYt1qxvSGWOjikQZ38VX",
  CLIENT_DOMAIN: "feeldaburn.auth0.com", // e.g., you.auth0.com
  AUDIENCE: environment.auth0.audience,
  REDIRECT: environment.auth0.redirect,
  SCOPE: "openid profile email"
};
