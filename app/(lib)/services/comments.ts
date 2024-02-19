import { PaginatedData } from "../definitions"
import client from "../apollo"
import { gql } from "@apollo/client";
import { flattenStrapiResponse } from "./helpers";
import { Comment } from "../definitions";

const getByProductId = async (id: string, page = 0, pageSize = 20): Promise<PaginatedData<Comment>>  => {
    const resp = await client.query({
        query: queryCommentsByProductId,
        variables: {
            productId: id,
            pagination: {
                page,
                pageSize,
            },
        }
    });
    const dataArr = resp.data.comments.data as any[];
    const comments = dataArr.map(comment => {
        const flat = flattenStrapiResponse({ comment: { ...comment.attributes, id: comment.id } });
        return formatCommentFromFlatResponse({...flat.comment})
    });
    return {
        data: comments,
        pagination: {...flattenStrapiResponse(resp.data.comments.meta)}
    }
}

export const comments = {
  getByProductId,
}

const queryCommentsByProductId = gql`query products($pagination: PaginationArg, $productId: ID) {
    comments(pagination: $pagination, filters: {
      product: {
        id: {
          eq: $productId
        }
      }
    }) {
      data {
        id,
        attributes {
          createdAt,
          message,
          product {
            data {
              id
            }
          }
          customer {
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

const formatCommentFromFlatResponse = (comment: any):Comment => {
    return {
        date: comment.createdAt,
        id: comment.id,
        userId: comment.customer.id,
        userName: comment.customer.name,
        productId: comment.product.id,
        message: comment.message,
    }
}