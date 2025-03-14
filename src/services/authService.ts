import { Request } from "express";

// Function to retrieve the stored access token from session
export const getStoredAccessToken = (req: Request): string | null => {
  if (!req.session || !req.session.accessToken) {
    console.warn("⚠️ No access token found in session.");
    return null;
  }
  return req.session.accessToken;
};
