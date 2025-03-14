import session from "express-session";

declare module "express-session" {
  interface SessionData {
    state?: string;
    codeVerifier?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
