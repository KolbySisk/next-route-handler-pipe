<p align="center">
  <h1 align="center">next-route-handler-pipe</h1>
  <p align="center">
    Laying down pipe for your <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers" rel="nofollow">Next.js Route Handlers.</a>
  </p>
</p>
<p align="center">
<a href="https://twitter.com/kolbysisk" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-@kolbysisk-e57060.svg" alt="Created by Kolby Sisk"></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/kolbysisk/next-route-handler-pipe" alt="License"></a>
</p>

<br/>
<br/>

## Introduction

Piping functions allows us to abstract reusable code that runs before the route handler is invoked.

#### Example uses:

✅ Validate body/query data
🔒 Verifying signatures
🪝 Catch errors
✨ Add data to the `req` object

## Getting started

#### 1. Install'r

`npm i next-route-handler-pipe`

#### 2. Create a pipe function

A pipe function is a function that accepts `req`, `event`, and `next`. It should return `await next()` when done, or return a `NextResponse`.

```ts
// PipeFunction accepts a generic when mutating req
export const withUser: PipeFunction<{ userId: string }> = async (req, event, next) => {
  const { userId } = await validateUserRequest();

  if (userId) {
    req.userId = userId;
    return await next();
  } else {
    return NextResponse.json({ message: 'Invalid auth token.' }, { status: 401 });
  }
};
```

#### 3. Create a pipe

Import the `pipe` function and pass it pipe functions followed by a handler. If a pipe function adds data to the req you can compose an intersection type with `NextRequest` & the added data.

```ts
import { pipe } from 'next-route-handler-pipe';

async function handler(req: NextRequest & { userId: string }) {
  console.log(req.userId);
}

export const POST = pipe(withUser, handler);
```

## Examples

#### validateBody

Combine with Zod to create an awesome validation pattern.

```ts
// validate-body.ts

// This is a pipe function that makes use of the factory pattern, meaning it returns a pipe function.
// This allows us to pass args into our pipe, like a zod schema.

export const validateBody = (zodSchema: z.ZodSchema): PipeFunction<{ data: any }> => {
  return async function (req, event, next) {
    // Get the body of the request and parse with Zod
    const body = await req.json();
    const validation = zodSchema.safeParse(typeof body === 'object' ? body : JSON.parse(body));

    // If validation fails we return early, preventing the handler from running.
    if (!validation.success) {
      console.error('Validation error from validateBody', validation.error);
      return NextResponse.json({ message: 'Validation error' }, { status: 400 });
    }
    // If validation passes we can add the parsed data to the req for easy access in our handler.
    else {
      req.data = validation.data;
      // Always return await next() in your pipe function.
      return await next();
    }
  };
};
```

```ts
// route.ts

// Create a Zod schema
const postSchema = z.object({
  postId: z.string(),
  postTitle: z.string(),
  authorName: z.string(),
});

// We can even add a Zod transform if we need
postSchema.transform(({postId, postTitle, authorName}) => {
  post_id: postId,
  post_title: postTitle,
  author_first_name: authorName.split(' ')[0],
  author_last_name: authorName.split(' ')[1]
})

// Infer type from schema
type Post = z.infer<typeof schema>;

// Add intersection with `NextRequest` & your inferred type
async function handler(req: NextRequest & { data: Post }) {
  // We've validated that this data will always exist at this point
  const { post_id, post_title } = req.data;
}

// Notice we're calling the validateBody function - that's because it's a factory that will return a pipe function
export const POST = pipe(validateBody(postSchema), handler);
```

#### catchErrors

We can also perform actions with inner pipe functions. In this example we wrap the inner pipe functions in a try catch, allowing us to catch any errors that bubble up.

```ts
export const catchErrors: PipeFunction = async (req, event, next) => {
  try {
    return await next();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error!' }, { status: 500 });
  }
};
```
