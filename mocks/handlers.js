import { http, HttpResponse, graphql } from 'msw'
import { productsResponse } from './data/graphqlResponses/products.js'
import { articlesResponse } from './data/graphqlResponses/articles.js'
import { categoriesResponse } from './data/graphqlResponses/categories.js'
import { commentsResponse } from './data/graphqlResponses/commentsForFirstProduct.js'

export const handlers = [
  graphql.query('products', () => {
    return HttpResponse.json({
      ...productsResponse
    })
  }),
  graphql.query('blogArticles', () => {
    return HttpResponse.json({
      ...articlesResponse
    })
  }),
  graphql.query('categories', () => {
    return HttpResponse.json({
      ...categoriesResponse
    })
  }),
  graphql.query('comments', () => {
    return HttpResponse.json({
      ...commentsResponse
    })
  }),
];