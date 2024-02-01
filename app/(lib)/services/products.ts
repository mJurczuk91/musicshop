import { getClient } from "../apollo";
import { gql } from "@apollo/client";
import { Product } from "../definitions";
import { flattenStrapiResponse } from "./helpers";

async function getById(productId: string)/* :Promise<Product> */ {
    const client = getClient();
    const resp = await client.query({
        variables: {productId},
        query: queryProductById,
        
    });
    const flat = flattenStrapiResponse(resp.data);
    for(let p of flat.product.imgs){
      console.log(p);
    }
}

export const products = {
    getById,
}

const queryProductById = gql`query productById($productId: ID!) {
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
              id,
              attributes {
                url
              }
            }
          }
  
        }
      }
    }
  }`