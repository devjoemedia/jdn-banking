export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/send",
    "/my-account",
    "/contacts",
    "/transactions",
    "/notifications",
    "/bank-accounts",
  ],
};
