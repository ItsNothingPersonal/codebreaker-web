import { solveKeyString } from '$lib/codebreaker';
import { decodeSchema } from '$lib/zod/decode';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const input = decodeSchema.safeParse(await request.json());

		if (input.error) {
			return new Response(JSON.stringify({ error: 'Ungültige Parameter' }), {
				status: 400
			});
		}

		const { keystring, numbers } = input.data;

		if (!numbers.every((num) => typeof num === 'number')) {
			return new Response(JSON.stringify({ error: 'Die Liste darf nur Nummern enthalten' }), {
				status: 400
			});
		}

		const result = solveKeyString(keystring, numbers);

		return new Response(JSON.stringify(result), { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Input konnte nicht decodiert werden' }), {
			status: 500
		});
	}
};
