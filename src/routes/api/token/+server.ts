import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { token } = await request.json();
	cookies.set('token', token, { path: '/' });
	return json({ token: true }, { status: 201 });
}

export function DELETE({ cookies }) {
	cookies.delete('token', { path: '/' });
	return json({ token: false }, { status: 200 });
}
