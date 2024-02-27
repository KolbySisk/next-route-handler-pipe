import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { pipe } from '../../../../../../src/pipe';
import { catchErrors } from '@/pipe-functions/catch-errors';
import { validateParams } from '@/pipe-functions/validate-params';

const paramsSchema = z.object({
  id: z.string(),
  author: z.string(),
});

type Params = z.infer<typeof paramsSchema>;

// Adding the params argument to the handler function to test, but it's not necessary.
// `validateParams` will add the params to `req.data`, and it will be validated and optionally transformed by Zod.
async function handler(req: NextRequest & { data: Params }, { params }: { params: { id: string; author: string } }) {
  const { id, author } = req.data;

  return NextResponse.json({ postId: id, postAuthor: author });
}

export const GET = pipe(catchErrors, validateParams(paramsSchema), handler);
