import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isSessionExpired } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user || isSessionExpired(session?.expires)) throw redirect(303, '/login');
	return {};
};
