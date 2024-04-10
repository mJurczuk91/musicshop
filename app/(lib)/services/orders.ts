import client from "../apollo";
import { gql } from "@apollo/client";
import { OrderElement, OrderHistoryEntry, PaginatedData, User } from "../definitions";
import { flattenStrapiResponse } from "./helpers";


export const orders = {
  create, getByUserId,
}

type RawOrderHistoryData = {
  products: string,
  createdAt: string,
  user: User,
  id: string,
}

async function create(order: OrderElement[], userId: string): Promise<{ success: boolean }> {
  try {
    const resp = await client.mutate({
      mutation: createOrder,
      variables: {
        data: {
          user: userId,
          products: JSON.stringify(order),
        }
      },
    });
    if (resp.errors) return { success: false };
    return { success: true };
  }
  catch (e) {
    console.log(JSON.stringify(e));
    return { success: false };
  }
}

async function getByUserId(userId: string, page = 0, pageSize = 20):Promise<PaginatedData<OrderHistoryEntry>>{
  try{
    const resp = await client.query({
      query: queryOrdersByUserId,
      variables: {
        userId,
        pagination: {
          page,
          pageSize,
        },
      }
    });
    const flat = flattenStrapiResponse(resp.data).orders as RawOrderHistoryData[];
    const flatParsed = flat.map(el => {
      return {
        ...el,
        products: JSON.parse(el.products),
      } 
    })
    return {
      data: flatParsed,
      pagination: {
        page: 0,
        pageCount: 0,
        pageSize: 0,
        total: 0,
      }
    };
  } catch (e){
    console.log(JSON.stringify(e));
    return {
      data: [],
      pagination: {
        page: 0,
        pageCount: 0,
        pageSize: 0,
        total: 0,
      }
    };
  }
}

const createOrder = gql`mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data) {
      data {
        id
        attributes {
          products
          user {
            data {
              id
            }
          }
        }
      }
    }
  }`

const queryOrdersByUserId = gql`query Orders( $pagination: PaginationArg, $user: ID) {
  orders(
    pagination: $pagination, 
    filters: {
      user: {
        id: {
          eq: $user
        }
      }
    }
    ) {
    data {
      attributes {
        products,
        createdAt,
        user {
          data {
            id
            attributes {
              email
              username
            }
          }
        }
      }
      id
    }
    meta {
      pagination {
        total
        pageSize
        pageCount
        page
      }
    }
  }
}`