import { http, HttpResponse, graphql } from 'msw'
import { blogArticles } from './data/mockBlogArticles.js';
import { categories } from './data/mockCategories.js';
import { users } from './data/mockUsers.js'
import { comments } from './data/mockComments.js';
import {products} from './data/graphqlResponses/products.js'

export const handlers = [
  graphql.query('products', ({query}) => {
    return HttpResponse.json({
      ...products 
    })
  })
];