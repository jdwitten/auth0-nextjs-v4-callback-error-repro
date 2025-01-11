import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextResponse } from 'next/server';

export const auth0 = new Auth0Client({
  onCallback: async (error, context) => {
    if (error != null) {
        console.error('An error occurred during authentication', error);
    }
    return NextResponse.redirect(
      new URL(context.returnTo || '/', 'http://localhost:3000'),
    );
  },
  authorizationParameters: {
    scope: 'openid profile email offline_access',
    audience: 'https://test-api.com',
    returnTo: 'http://localhost:3000',
  },
});