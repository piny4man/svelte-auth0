import { getAppToken, isSessionExpired } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	let token = await event.locals.token;
	if (!token && !isSessionExpired(session?.expires)) {
		token = await getAppToken();
	}
	return {
		session,
		token
	};
};
