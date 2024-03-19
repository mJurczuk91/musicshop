import client from "../apollo";
import { gql } from "@apollo/client";
import { OrderElement, PaginatedData} from "../definitions";


export const orders = {
    create,
}

async function create(order:OrderElement[], userId: string):Promise<{success: boolean}>{
    try{
        const resp = await client.mutate({
            mutation: createOrder,
            variables: {
              data:{
                user: userId,
                products: JSON.stringify(order),
              }
            },
        });
        if(resp.errors) return {success: false};
        return {success: true};
    }
    catch (e){
      console.log(JSON.stringify(e));
        return {success: false};
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