import client from "../apollo";
import { gql } from "@apollo/client";
import { PaginatedData, Product } from "../definitions";
import { flattenStrapiResponse } from "./helpers";
import { HOST } from "./helpers"

async function getById(productId: string): Promise<Product> {
  const resp = await client.query({
    query: queryProductById,
    variables: { productId },
  });

  const flat = { ...flattenStrapiResponse(resp.data).product };
  return formatProductFromFlatResponse(flat);
}

async function getByCategory(categoryId: string, page: number = 0, pageSize: number = 20):Promise<PaginatedData<Product>> {
  const resp = await client.query({
    query: queryProductsByCategory,
    variables: {
      pagination: {
        page,
        pageSize,
      },
      categoryId,
    }
  });
  const dataArr = resp.data.products.data as any[];
  const products = dataArr.map(product => {
    const flat = flattenStrapiResponse({ product: { ...product.attributes, id: product.id } });
    return formatProductFromFlatResponse(flat.product);
  });
  return {
    data: products,
    pagination: {...flattenStrapiResponse(resp.data.products.meta)}
  }
}

async function getPage(page: number = 0, pageSize: number = 20): Promise<PaginatedData<Product>> {
  const resp = await client.query({
    query: queryProducts,
    variables: {
      pagination: {
        page,
        pageSize,
      }
    }
  });
  const dataArr = resp.data.products.data as any[];
  const products = dataArr.map(product => {
    const flat = flattenStrapiResponse({ product: { ...product.attributes, id: product.id } });
    return formatProductFromFlatResponse(flat.product);
  })
  const fs = require('fs');
  fs.writeFile('output.json', JSON.stringify(products), () => {
    
  })
  return {
    data: products,
    pagination: {...flattenStrapiResponse(resp.data.products.meta)},
  }
}

export const products = {
  getPage, getById, getByCategory
}

const formatProductFromFlatResponse = (flat: any): Product => {
  const imgs = flat.imgs as any[];
  return {
    id: flat.id,
    name: flat.name,
    category: flat.category.name,
    categoryId: flat.category.id,
    subcategory: flat.subcategory.name,
    subcategoryId: flat.subcategory.id,
    price: flat.price,
    amount: flat.amount,
    description: flat.description,
    imgUrlArray: formatImgUrlArray(imgs),
    details: JSON.parse(flat.details),
  }
}

const formatImgUrlArray = (imgs: any[]): string[] => {
  const imgUrls = imgs.map(i => HOST.concat(i.url))
  // SHUFFLING IMAGES JUST TO MAKE HOME PAGE LOOK BETTER, DELETE THIS LATER
  return imgUrls
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const queryProducts = gql`query products($pagination: PaginationArg) {
  products(pagination: $pagination) {
    data {
      id,
      attributes {
        amount,
        name,
        price,
        description,
        details,

        category {
          data {
            id,
            attributes {
              name
            }
          }
        },

        subcategory {
          data {
            id,
            attributes {
              name
            }
          }
        },

        imgs {
          data {
            attributes {
              url
            }
          }
        }

      }
    }
    meta {
      pagination {
        page,
        pageCount,
        pageSize,
        total,
      }
    }
  }
}`

const queryProductById = gql`query productById($productId: ID) {
  product(id: $productId) {
    data {
      id,
      attributes {
        amount,
        name,
        price,
        description,
        details,

        category {
          data {
            id,
            attributes {
              name
            }
          }
        },

        subcategory {
          data {
            id,
            attributes {
              name
            }
          }
        },

        imgs {
          data {
            attributes {
              url
            }
          }
        }

      }
    }
  }
}`

const queryProductsByCategory = gql`query productByCategory($categoryId: ID, $pagination: PaginationArg) {
  products(pagination: $pagination, filters: {
    category: {
      id: {
        eq: $categoryId
      }
    }
  }) {
    data {
      id,
      attributes {
        amount,
        name,
        price,
        description,
        details,

        category {
          data {
            id
            attributes {
              name
            }
          }
        },

        subcategory {
          data {
            id
            attributes {
              name
            }
          }
        },

        imgs {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}`