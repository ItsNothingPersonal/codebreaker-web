import { z } from 'zod';

export const encodeSchema = z.object({
	keystring: z.string(),
	target: z.string()
});

export type EncodeSchema = z.infer<typeof encodeSchema>;
