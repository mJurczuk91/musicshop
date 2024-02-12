import { PaginatedData } from "../definitions"
import { getClient } from "../apollo"
import { gql } from "@apollo/client";
import { flattenStrapiResponse } from "./helpers";
import { Category } from "../definitions";

const getAll = async (page = 0, pageSize = 100):Promise<PaginatedData<Category>> => {
    const client = getClient();
    const resp = await client.query({
        query: queryCategories,
        variables: {
            pagination: {
                page,
                pageSize,
            },
        }
    })
    const dataArr = resp.data.categories.data as any[];
    const categories = dataArr.map(category => {
        const flat = flattenStrapiResponse({ category: { ...category.attributes, id: category.id } });
        return formatCategoryFromApiResponse(flat.category);
    });
    return {
        data: categories,
        pagination: {...flattenStrapiResponse(resp.data.categories.meta)}
    }
}

export const categories = {
    getAll,
}

const formatCategoryFromApiResponse = (category:any):Category => {
    return {
        id: category.id,
        name: category.name,
        subcategories: category.subcategories,
    }
}

const queryCategories = gql`query Categories($pagination: PaginationArg){
    categories(pagination: $pagination) {
      data {
        id,
        attributes {
          name,
          subcategories {
            data {
              id,
              attributes {
                name
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