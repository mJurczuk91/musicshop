import { http, HttpResponse } from 'msw'
import { blogArticles } from './data/mockBlogArticles.js';
import { categories } from './data/mockCategories.js';
import { products } from './data/mockProducts.js';
import { users } from './data/mockUsers.js'
import { comments } from './data/mockComments.js';

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