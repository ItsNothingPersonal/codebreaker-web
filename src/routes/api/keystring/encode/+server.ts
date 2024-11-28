import { encodeKeyString } from '$lib/codebreaker';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { keystring, target } = await request.json();

		if (typeof keystring !== 'string' || typeof target !== 'string') {
			return new Response(JSON.stringify({ error: 'Ungültige Parameter' }), {
				status: 400
			});
		}

		const result = encodeKeyString(keystring, target);

		return new Response(JSON.stringify(result), { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Input konnte nicht decodiert werden' }), {
			status: 500
		});
	}
};
