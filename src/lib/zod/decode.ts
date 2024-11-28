import { z } from 'zod';

export const decodeSchema = z.object({
	keystring: z.string(),
	numbers: z.array(z.number())
});

export type DecodeSchema = z.infer<typeof decodeSchema>;
