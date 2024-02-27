import { NextResponse } from 'next/server';
import { z } from 'zod';

import { PipeFunction } from '../../src/types';

export const validateParams = (zodSchema: z.ZodSchema): PipeFunction<{ data: any }> => {
  return async function (req, params, next) {
    const validation = zodSchema.safeParse(params?.params);

    if (!validation.success) {
      console.error('Validation error from validateParams', validation.error);
      return NextResponse.json({ message: 'Validation error' }, { status: 400 });
    } else {
      req.data = validation.data;
      return await next();
    }
  };
};
