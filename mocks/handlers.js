import { http, HttpResponse } from 'msw'
import {blogArticles, categories, products} from './mockData.js';

export const handlers = [
  http.get("http://localhost:3001/products", () => {
    return HttpResponse.json(products);
  }),
  http.get("http://localhost:3001/articles", () => {
    return HttpResponse.json(blogArticles);
  }),
  http.get("http://localhost:3001/categories", () => {
    return HttpResponse.json(categories);
  }),
];