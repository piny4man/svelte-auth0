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
				issuer: 'https://licensebat.eu.auth0.com/',
				clientId: 'ZT12emV6G5eJreOhAAGYi5wKG9vsHgdD',
				clientSecret: '6ho3JTGyKSOHY1eCOh23Zctq_bc--anyvDNIO4w0vo8t7x11WSahkS4JiHpkuj9E'
			})
		],
		secret: '5b88e584cc0f417ed311dc1389a80db3a1598fde0599804fa9e67548e042f080',
		trustHost: true
	}),
	authorization
);
