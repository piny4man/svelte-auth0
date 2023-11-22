import { createAuth0Client } from '@auth0/auth0-spa-js';

async function getAuthClient() {
	return await createAuth0Client({
		domain: process.env.AUTH0_DOMAIN,
		clientId: process.env.AUTH0_CLIENT_ID,
		authorizationParams: {
			audience: process.env.AUTH0_AUDIENCE
		}
	});
}

export { getAuthClient };
