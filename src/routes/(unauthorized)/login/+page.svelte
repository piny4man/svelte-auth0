<script lang="ts">
	import { getAuthClient } from '$lib/auth';

	const login = async () => {
		const authClient = await getAuthClient();
		authClient.loginWithRedirect({
			authorizationParams: {
				redirect_uri: process.env.AUTH0_REDIRECT_URI
			}
		});
	};
</script>

<div class="container">
	<button on:click={login}> Login </button>
</div>
