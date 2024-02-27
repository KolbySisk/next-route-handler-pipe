import { NextResponse } from 'next/server';

import { PipeFunction } from '../../src/types';

export const catchErrors: PipeFunction = async (req, params, next) => {
  try {
    return await next();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error!' }, { status: 500 });
  }
};
