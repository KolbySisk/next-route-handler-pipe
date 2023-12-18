import { NextResponse } from 'next/server';
import { z } from 'zod';

import { PipeFunction } from '../src/types';

export const validateQuery = (zodSchema: z.ZodSchema): PipeFunction<{ data: any }> => {
  return async function (req, event, next) {
    const searchParams = req.nextUrl.searchParams;
    const validation = zodSchema.safeParse(Object.fromEntries(searchParams));

    if (!validation.success) {
      console.error('Validation error from validateQuery', validation.error);
      return NextResponse.json({ message: 'Validation error' }, { status: 400 });
    } else {
      req.data = validation.data;
      return await next();
    }
  };
};
