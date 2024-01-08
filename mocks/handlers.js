import { http, HttpResponse } from 'msw'
import {products} from './products';

export const handlers = [
  http.get("http://localhost:3000/products", ( {request} ) => {
    return HttpResponse.json(products)
  }),
];