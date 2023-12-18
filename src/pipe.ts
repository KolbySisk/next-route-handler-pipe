import { NextFetchEvent, NextRequest } from 'next/server';

import { Next, PipeFunctionOrHandler } from './types';

export function pipe(...pipeFunctions: PipeFunctionOrHandler[]) {
  return async function internalHandler(req: NextRequest, event: NextFetchEvent) {
    return await startPiping(req, event, pipeFunctions, 0);
  };
}

async function startPiping(
  req: NextRequest,
  event: NextFetchEvent,
  pipeFunctions: PipeFunctionOrHandler[],
  currentPipeFunctionIndex: number
) {
  const next: Next = async () => {
    // Get next pipeFunction, if there is one - if there isn't we stop execution
    const nextPipeFunction = pipeFunctions[currentPipeFunctionIndex + 1];
    if (!nextPipeFunction) return;

    // Recursively run next pipeFunction
    return await startPiping(req, event, pipeFunctions, currentPipeFunctionIndex + 1);
  };

  // Initializes pipeFunction chain - the next function will
  // recursively run next pipeFunction when called by the current pipeFunction
  return await pipeFunctions[currentPipeFunctionIndex](req, event, next);
}
