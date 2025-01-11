This is mostly a clone of the sample Auth0/NextJS starter project. The main goal of this project is to show a minimal repro for the bug described here: https://github.com/auth0/nextjs-auth0/issues/1861

I upgraded Next.js and auth0-nextjs package to v15 and v4 respectively to demonstrate the issue.

The sample app was built for Next v13 and Auth0 v3, but there were several breaking changes in Auth0 v4 that make this sample app incompatible.
I only attempted to fix breaking changes so far as to show the issue that I was experiencing in my real application. 

To repro the issue follow these steps:

1. Set up a sample project in Auth0. It should just use all of the defaults for a "Regular web app" and "Next.js" project. Make sure to create an API as well that can be used as the "audience" parameter to the Auth0 sdk
2. Set the "allowed callback URLs" to http://localhost:3000/auth/callback, "login URI" to https://127.0.0.1:3000/auth/login and logout URL to http://localhost:3000 in the Application settings in the Auth0 UI
3. Set up the .env.local file with your project's values:
```
AUTH0_SECRET=<generated>
APP_BASE_URL=http://localhost:3000
AUTH0_DOMAIN=<insert yours here>
AUTH0_CLIENT_ID=<insert yours here>
AUTH0_CLIENT_SECRET=<insert yours here>
AUTH0_SCOPE='openid profile email'
AUTH0_AUDIENCE=<insert the name of your API here>
```
4. Create an organization in the Auth0 UI and enable the Username/Password connection for that organization
5. Create an invitation for a user that you can use to test
6. Run the development server with `yarn dev` (or if you want to use a debugger to step through the code to examine how the state and transaction params are being set you can press "Next.js: debug server" in VSCode Run and Debug tab and set a breakpoint in the `middleware.js` file)
7. Go to the invitation email and accept the invitation. Note, you may need to adjust the https v.s http setting in the link because by default yarn dev runs on http, but Auth0 won't allow setting login URI that is not HTTPS
8. Note that you are redirected to the Universal Login page and either create a password or login with an existing password for the user with the invitation
9. Note you are redirected back to localhost and you can use the debugger to inspect the request middleware. See that the state param is correct, but there is no corresponding transaction cookie. This results in an `invalid_state` error.
