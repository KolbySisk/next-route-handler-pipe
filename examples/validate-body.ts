import { NextResponse } from 'next/server';
import { z } from 'zod';

import { PipeFunction } from '../src/types';

export const validateBody = (zodSchema: z.ZodSchema): PipeFunction<{ data: any }> => {
  return async function (req, event, next) {
    const body = await req.json();
    const validation = zodSchema.safeParse(typeof body === 'object' ? body : JSON.parse(body));

    if (!validation.success) {
      console.error('Validation error from validateBody', validation.error);
      return NextResponse.json({ message: 'Validation error' }, { status: 400 });
    } else {
      req.data = validation.data;
      return await next();
    }
  };
};
