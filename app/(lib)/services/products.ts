import client from "../apollo";
import { gql } from "@apollo/client";
import { PaginatedData, Product } from "../definitions";
import { flattenStrapiResponse } from "./helpers";

export enum ProductQuerySort {
  'nameAsc' = "name:asc",
  'nameDesc' = "name:desc",
  'priceAsc' = "price:asc",
  'priceDesc' = "price:desc",
  'default' = 'id'
}

export const products = {
  getPage, getById, getByCategory, getBySubcategory
}

async function getById(productId: string): Promise<Product> {
  const resp = await client.query({
    query: queryProductById,
    variables: { productId },
  });

  const flat = { ...flattenStrapiResponse(resp.data).product };
  return formatProductFromFlatResponse(flat);
}

type CategoryQueryParams = {
  categoryId:string,
  sort?: string,
  page?: number,
  pageSize?: number,
}

async function getByCategory({categoryId, page = 0, pageSize= 20, sort = ProductQuerySort.default}:CategoryQueryParams):Promise<PaginatedData<Product>> {
  const resp = await client.query({
    query: queryProductsByCategory,
    variables: {
      categoryId,
      pagination: {
        page,
        pageSize,
      },
      sort,
    }
  });
  const dataArr = resp.data.products.data as any[];
  const products = dataArr.map(product => {
    const flat = flattenStrapiResponse({ product: { ...product.attributes, id: product.id } });
    return formatProductFromFlatResponse(flat.product);
  });
  return {
    data: products,
    pagination: resp.data.products.meta.pagination,
  }
}

type SubcategoryQueryParams = {
  subcategoryId:string,
  sort?: string,
  page?: number,
  pageSize?: number,
}

async function getBySubcategory({subcategoryId, page = 0, pageSize= 20, sort = ProductQuerySort.default}:SubcategoryQueryParams):Promise<PaginatedData<Product>> {
  const resp = await client.query({
    query: queryProductsBySubcategory,
    variables: {
      pagination: {
        page,
        pageSize,
      },
      subcategoryId,
      sort,
    }
  });
  const dataArr = resp.data.products.data as any[];
  const products = dataArr.map(product => {
    const flat = flattenStrapiResponse({ product: { ...product.attributes, id: product.id } });
    return formatProductFromFlatResponse(flat.product);
  });
  return {
    data: products,
    pagination: resp.data.products.meta.pagination,
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
  return {
    data: products,
    pagination: resp.data.products.meta.pagination,
  }
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
  const host = process.env.HOST;
  if(!host) throw new Error('HOST ENV VARIABLE NOT SET');
  const imgUrls = imgs.map(i => host.concat(i.url))
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

/* const queryProductsByNamePartial = gql`query productsByNamePartial($name: String, $pagination: PaginationArg) {
  products(pagination: $pagination, filters: {
    name: {
      containsi: $name
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
    meta {
      pagination {
        page,
        pageCount,
        pageSize,
        total,
      }
    }
  }
}` */

const queryProductsByCategory = gql`query productsByCategorySort($categoryId: ID, $pagination: PaginationArg, $sort:[String]) {
  products(
    pagination: $pagination,
    sort: $sort,
    filters: {
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

const queryProductsBySubcategory = gql`query productsBySubcategorySort($subcategoryId: ID, $pagination: PaginationArg, $sort:[String]) {
  products(
    pagination: $pagination,
    sort: $sort,
    filters: {
      subcategory: {
      id: {
        eq: $subcategoryId
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