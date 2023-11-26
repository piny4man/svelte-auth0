import { SvelteKitAuth } from '@auth/sveltekit';

import Auth0 from '@auth/core/providers/auth0';
import type { Handle } from '@sveltejs/kit';
import { getAppToken } from '$lib/server/auth';

let token: string | null = null;

export const handle: Handle = async ({ event, resolve }) => {
	if (token) {
		event.locals.token = token;
	}
	return SvelteKitAuth({
		providers: [
			Auth0({
				issuer: import.meta.env.VITE_AUTH0_ISSUER,
				clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
				clientSecret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
				jwks_endpoint: `${import.meta.env.VITE_AUTH0_ISSUER}.well-known/jwks.json}`
			})
		],
		secret: import.meta.env.VITE_AUTH_SECRET,
		trustHost: true,
		useSecureCookies: true,
		events: {
			async signIn() {
				token = await getAppToken();
				console.log('token', token);
			}
		}
	})({ event, resolve });
};
