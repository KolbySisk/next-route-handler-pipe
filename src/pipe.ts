import { NextRequest } from 'next/server';

import { Next, Params, PipeFunctionOrHandler } from './types';

export function pipe(...pipeFunctions: PipeFunctionOrHandler<any>[]) {
  return async function internalHandler(req: NextRequest, params: Params) {
    return await startPiping(req, params, pipeFunctions, 0);
  };
}

async function startPiping(
  req: NextRequest,
  params: Params,
  pipeFunctions: PipeFunctionOrHandler<any>[],
  currentPipeFunctionIndex: number
) {
  const next: Next = async () => {
    // Get next pipeFunction, if there is one - if there isn't we stop execution
    const nextPipeFunction = pipeFunctions[currentPipeFunctionIndex + 1];
    if (!nextPipeFunction) return;

    // Recursively run next pipeFunction
    return await startPiping(req, params, pipeFunctions, currentPipeFunctionIndex + 1);
  };

  // Initializes pipeFunction chain - the next function will
  // recursively run next pipeFunction when called by the current pipeFunction
  return await pipeFunctions[currentPipeFunctionIndex](req, params, next);
}
