import { http, HttpResponse } from 'msw'
import {blogArticles, products} from './mockData.js';

export const handlers = [
  http.get("http://localhost:3000/products", () => {
    return HttpResponse.json(products);
  }),
  http.get("http://localhost:3000/articles", () => {
    return HttpResponse.json(blogArticles);
  }),
];