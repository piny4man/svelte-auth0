import { SvelteKitAuth } from '@auth/sveltekit';
import Auth0 from '@auth/core/providers/auth0';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authorization: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/authenticated')) {
		const session = await event.locals.getSession;
		if (!session) {
			throw redirect(303, '/');
		}
	}
	return resolve(event);
};

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			Auth0({
				issuer: import.meta.env.VITE_AUTH0_ISSUER,
				clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
				clientSecret: import.meta.env.VITE_AUTH0_CLIENT_SECRET
			})
		],
		secret: import.meta.env.VITE_AUTH_SECRET,
		trustHost: true
	}),
	authorization
);
