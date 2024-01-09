import { http, HttpResponse } from 'msw'
import {products} from './mockData.js';

export const handlers = [
  http.get("http://localhost:3000/products", () => {
    return HttpResponse.json(products)
  })
];