import client from "../apollo";
import { ApolloQueryResult, gql } from "@apollo/client";
import { PaginatedData, Product } from "../definitions";
import { flattenStrapiResponse } from "./helpers";
import { HOST_URL } from "../globals";

export enum ProductQuerySort {
  'nameAsc' = "name:asc",
  'nameDesc' = "name:desc",
  'priceAsc' = "price:asc",
  'priceDesc' = "price:desc",
  'default' = 'id'
}

export const products = {
  getPage, getById, getByCategory, getBySubcategory, getByNamePartial
}

export const productsSearch = async (name: string) => {
  return await getByNamePartial({ name: name });
};

async function getById(productId: string): Promise<Product> {
  try {
  const resp = await client.query({
    query: queryProductById,
    variables: { productId },
  });
    const flat = { ...flattenStrapiResponse(resp.data).product };
    return formatProductFromFlatResponse(flat);
  } catch (e) {
    throw new Error('404 not found');
  }
}

type NamePartialParams = {
  name: string,
  sort?: string,
  page?: number,
  pageSize?: number,
}

async function getByNamePartial({ name, page = 0, pageSize = 5 }: NamePartialParams): Promise<PaginatedData<Product>> {
  const resp = await client.query({
    query: queryProductsByNamePartial,
    variables: {
      name,
      pagination: {
        page,
        pageSize,
      }
    }
  });
  return processResponse(resp);
}

type CategoryQueryParams = {
  categoryId: string,
  sort?: string,
  page?: number,
  pageSize?: number,
}

async function getByCategory({ categoryId, page = 0, pageSize = 20, sort = ProductQuerySort.default }: CategoryQueryParams): Promise<PaginatedData<Product>> {
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
  return processResponse(resp);
}

type SubcategoryQueryParams = {
  subcategoryId: string,
  sort?: string,
  page?: number,
  pageSize?: number,
}

async function getBySubcategory({ subcategoryId, page = 0, pageSize = 20, sort = ProductQuerySort.default }: SubcategoryQueryParams): Promise<PaginatedData<Product>> {
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
  return processResponse(resp);
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
  return processResponse(resp);
}

async function processResponse(resp: ApolloQueryResult<any>): Promise<PaginatedData<Product>> {
  try {
    const pagination = resp.data.products.meta.pagination;
    const dataArr = resp.data.products.data as any[];
    const products = dataArr.map(product => {
      const flat = flattenStrapiResponse({ product: { ...product.attributes, id: product.id } });
      return formatProductFromFlatResponse(flat.product);
    });
    return {
      data: products,
      pagination,
    }
  } catch (e) {
    throw new Error("404 not found");
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
  const imgUrls = imgs.map(i => HOST_URL.concat(i.url))
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

const queryProductsByNamePartial = gql`query productsByNamePartial($name: String, $pagination: PaginationArg ) {
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
}`

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