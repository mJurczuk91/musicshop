import { http, HttpResponse } from 'msw'
import {blogArticles, categories, products, users} from './mockData.js';
import { comments } from './mockComments.js';

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
  http.get("http://localhost:3001/users", () => {
    return HttpResponse.json(users);
  }),
  http.get("http://localhost:3001/comments", () => {
    return HttpResponse.json(comments);
  }),
];