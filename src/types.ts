import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type Next = () => Promise<NextResponse | void>;
export type Handler<AdditionalReqProperties = {}> = (
  req: NextRequest & AdditionalReqProperties
) => NextResponse | Promise<NextResponse>;
export type HandlerWithEvent<AdditionalReqProperties = {}> = (
  req: NextRequest & AdditionalReqProperties,
  event: NextFetchEvent
) => NextResponse | Promise<NextResponse>;
export type PipeFunction<AdditionalReqProperties = {}> = (
  req: NextRequest & AdditionalReqProperties,
  event: NextFetchEvent,
  next: Next
) => Promise<NextResponse | void>;
export type PipeFunctionOrHandler<AdditionalReqProperties = any> =
  | Handler<AdditionalReqProperties>
  | HandlerWithEvent<AdditionalReqProperties>
  | PipeFunction<AdditionalReqProperties>;
