<script lang="ts">
	import { decodeSchema } from '$lib/zod/decode';
	import { encodeSchema } from '$lib/zod/encode';
	import { error } from '@sveltejs/kit';

	let decoded: string | undefined = $state();
	let encoded: string | undefined = $state();
	let keystring: string | undefined = $state();

	async function handleSubmit() {
		if (!encoded && !decoded) error(500, 'No encoded or decoded text provided');

		if (encoded) {
			try {
				const body = decodeSchema.safeParse({
					numbers: encoded
						.replaceAll(/["'[\]]/g, '')
						.split(',')
						.map((num) => parseInt(num, 10)),
					keystring: keystring
				});

				if (!body.success) {
					throw new Error(`Invalid input: ${body.error}`);
				}

				const response = await fetch('/api/keystring/decode', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body.data)
				});

				if (!response.ok) {
					throw new Error(`Server error: ${response.status}`);
				}

				decoded = await response.json();
			} catch (err) {
				console.error('Failed to send request:', err);
				error(500, 'Failed to send request');
			}
		} else if (decoded) {
			try {
				const body = encodeSchema.safeParse({
					target: decoded,
					keystring: keystring
				});

				if (!body.success) {
					throw new Error(`Invalid input: ${body.error}`);
				}

				const response = await fetch('/api/keystring/encode', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body.data)
				});

				if (!response.ok) {
					throw new Error(`Server error: ${response.status}`);
				}

				encoded = JSON.stringify(await response.json());
			} catch (err) {
				console.error('Failed to send request:', err);
				error(500, 'Failed to send request');
			}
		}
	}
</script>

<div class="flex w-full max-w-[33%] flex-col gap-2">
	<label class="label">
		<span class="label-text">Keystring</span>
		<input
			id="keystring"
			class="input p-2"
			bind:value={keystring}
			type="text"
			placeholder="Hier den Keystring einfügen"
		/>
	</label>

	<label class="label">
		<span class="label-text">Decoded</span>
		<textarea
			id="decoded"
			class="textarea p-2"
			bind:value={decoded}
			rows="4"
			placeholder="Hier den unverschlüsselten Text einfügen"
		></textarea>
	</label>

	<button id="submitButton" type="button" class="btn preset-filled" onclick={handleSubmit}>
		Encode/Decode
	</button>

	<label class="label">
		<span class="label-text">Encoded</span>
		<textarea
			id="encoded"
			class="textarea p-2"
			rows="4"
			bind:value={encoded}
			placeholder="Hier den verschlüsselten Text einfügen"
		></textarea>
	</label>
</div>
