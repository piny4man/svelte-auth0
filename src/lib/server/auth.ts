export const getAppToken = async () => {
	const response = await fetch(`${import.meta.env.VITE_AUTH0_ISSUER}oauth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			grant_type: 'client_credentials',
			client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
			client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
			audience: import.meta.env.VITE_AUTH0_AUDIENCE
		})
	});
	if (!response.ok) {
		throw new Error('Failed to get app token');
	}
	const { access_token } = await response.json();
	return access_token;
};

export const isSessionExpired = (expires?: string) => {
	if (!expires) return true;
	const expirationDate = new Date(expires);
	if (expirationDate.getTime() < new Date().getTime()) return true;
};
