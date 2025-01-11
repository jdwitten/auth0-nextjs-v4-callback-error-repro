import { auth0 } from './app/lib/auth0';
export default async function middleware(req) {
  const response = await auth0.middleware(req);
  return response;
}

export const config = {
    matcher: [
      // Taken from https://next-intl-docs.vercel.app/docs/routing/middleware#matcher-no-prefix
      // May need to update if we end up with routes with a dot in them
  
      // Match all pathnames except for
      // - … if they start with `/_next` or `/_vercel`
      // - … the ones containing a dot (e.g. `favicon.ico`)
      '/((?!_next|_vercel|.*\\..*).*)',
    ],
  };