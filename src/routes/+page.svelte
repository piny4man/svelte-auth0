<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import {} from '@sveltejs/kit';
</script>

<h1>SvelteKit Auth PoC</h1>
<p>
	{#if $page.data.session}
		<span>
			<small>Signed in as</small>
			<strong>{$page.data.session.user?.name ?? 'User'}</strong>
		</span>
		<button on:click={() => signOut()}>Sign out</button>
	{:else}
		<span>You are not signed in</span>
		<button on:click={() => signIn('auth0')}>Sign in with Github</button>
	{/if}
</p>
