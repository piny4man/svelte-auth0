<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let data: string;

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/dashboard/health', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${$page.data.token}`
				}
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			data = await response.text();
		} catch (error) {
			console.error('Request failed', error);
		}
	});
</script>

<main>
	<header>
		<h1>Dashboard</h1>
		{#if $page.data.session}
			<nav>
				<small>Signed in as</small>
				<strong>{$page.data.session.user?.name ?? 'User'}</strong>
				<img src={$page.data.session.user?.image} alt={$page.data.session.user?.name} />
			</nav>
			<button on:click={() => signOut()}>Sign out</button>
		{/if}
	</header>
	<article class="content">
		{#if data}
			<h2>{data}</h2>
		{:else}
			<h2>Loading...</h2>
		{/if}
	</article>
</main>
