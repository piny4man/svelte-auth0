import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { getAuthClient } from '$lib/auth';
// import { auth } from '$lib/stores'
// import { unauthorizedRoutes } from '$lib/common'

export async function load({ url }) {
	const path = url.pathname;
	if (!browser) return;

	// const client = get(auth) || (await getAuthClient());
	const client = await getAuthClient();
	const isAuthenticated = await client.isAuthenticated();

	// const isAuthorizedRoute = !unauthorizedRoutes.some((exPath) => exPath === path);
}
