import { NextRequest } from 'next/server';

import { pipe } from '../../../../src/pipe';
import { catchErrors } from '@/pipe-functions/catch-errors';

async function handler(req: NextRequest) {
  throw new Error('Catch me');
}

export const GET = pipe(catchErrors, handler);
