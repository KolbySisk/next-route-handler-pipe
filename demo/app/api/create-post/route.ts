import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { pipe } from '../../../../src/pipe';
import { catchErrors } from '@/pipe-functions/catch-errors';
import { validateBody } from '@/pipe-functions/validate-body';

const postSchema = z.object({
  postTitle: z.string(),
  postText: z.string(),
});

type Post = z.infer<typeof postSchema>;

async function handler(req: NextRequest & { data: Post }) {
  const { postTitle, postText } = req.data;
  return NextResponse.json({ postTitle, postText });
}

export const POST = pipe(catchErrors, validateBody(postSchema), handler);
