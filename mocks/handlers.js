// MSW handlers
import { http, HttpResponse, rest } from 'msw'

export const handlers = [
  http.get("http://example.com/", ( {request} ) => {
    console.log(request.method, request.url);
    return HttpResponse.json({ mocked: true })
  }),
];