import { NextRequest, NextResponse } from 'next/server';

export type Next = () => Promise<NextResponse | void>;

export type Params = Record<'params', any>;

export type Handler<AdditionalReqProperties = void> = (
  req: NextRequest & AdditionalReqProperties
) => NextResponse | Promise<NextResponse>;

export type HandlerWithParams<AdditionalReqProperties = void> = (
  req: NextRequest & AdditionalReqProperties,
  params: Params
) => NextResponse | Promise<NextResponse>;

export type PipeFunction<AdditionalReqProperties = void> = (
  req: NextRequest & AdditionalReqProperties,
  params: Params | undefined,
  next: Next
) => Promise<NextResponse | void>;

export type PipeFunctionOrHandler<AdditionalReqProperties> =
  | Handler<AdditionalReqProperties>
  | HandlerWithParams<AdditionalReqProperties>
  | PipeFunction<AdditionalReqProperties>;
