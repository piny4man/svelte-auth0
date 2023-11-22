<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAuthClient } from '$lib/auth';
	// import { auth } from '$lib/stores';

	let authClient: any = null;

	onMount(async () => {
		const client = await getAuthClient();
		const isAuthenticated = await client.isAuthenticated();

		if (!isAuthenticated) {
			await client.handleRedirectCallback();
		}

		const token = await client.getTokenSilently();
		authClient = client;

		await fetch('/api/token', {
			method: 'POST',
			body: JSON.stringify({ token })
		});

		goto('/dashboard');
	});

	// $: $auth = authClient;
</script>
