import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { pipe } from '../../../../src/pipe';
import { catchErrors } from '@/pipe-functions/catch-errors';
import { validateQuery } from '@/pipe-functions/validate-query';

const postSchema = z.object({
  postId: z.string(),
  postAuthor: z.string(),
});

type Post = z.infer<typeof postSchema>;

async function handler(req: NextRequest & { data: Post }) {
  const { postId, postAuthor } = req.data;
  return NextResponse.json({ postId, postAuthor });
}

export const GET = pipe(catchErrors, validateQuery(postSchema), handler);
