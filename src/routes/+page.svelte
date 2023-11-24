<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<h1>Dashboard</h1>
{#if $page.data.session}
	<span>
		<small>Signed in as</small>
		<strong>{$page.data.session.user?.name ?? 'User'}</strong>
	</span>
	<button on:click={() => signOut()}>Sign out</button>
{/if}
