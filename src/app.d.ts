// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Locals as SvelteKitLocals } from '@sveltejs/kit';

declare global {
	namespace App {
		// interface Error {}
		interface Locals extends SvelteKitLocals {
			token?: string;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
