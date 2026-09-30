import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export async function helloHandler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`[HTTP ${request.method}] /api/hello received`);

  const name = request.query.get('name') || 'world';

  return {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    jsonBody: {
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString(),
      service: 'Pilates Workout Generator API',
    },
  };
}

app.http('hello', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: helloHandler,
});
