import { getClient } from "../apollo";
import { gql } from "@apollo/client";
import { PaginatedData, Product } from "../definitions";
import { flattenStrapiResponse } from "./helpers";
import { HOST } from "./helpers"

async function getById(productId: string): Promise<Product> {
  const client = getClient();
  const resp = await client.query({
    query: queryProductById,
    variables: { productId },
  });

  const flat = { ...flattenStrapiResponse(resp.data).product };
  return formatProductFromFlatResponse(flat);
}

async function getPage(page: number = 0, pageSize: number = 20): Promise<PaginatedData<Product>> {
  const client = getClient();
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
  return {
    data: products,
    pagination: {
      page: resp.data.products.meta.pagination.page,
      pageCount: resp.data.products.meta.pagination.pageCount,
      pageSize: resp.data.products.meta.pagination.pageSize,
      total: resp.data.products.meta.pagination.total,
    },
  }
}

export const products = {
  getPage, getById,
}

const formatProductFromFlatResponse = (flat: any): Product => {
  const imgs = flat.imgs as any[];
  return {
    id: flat.id,
    name: flat.name,
    category: flat.category.name,
    subcategory: flat.subcategory.name,
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
            attributes {
              name
            }
          }
        },

        subcategory {
          data {
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
            attributes {
              name
            }
          }
        },

        subcategory {
          data {
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