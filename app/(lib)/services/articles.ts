import { PaginatedData } from "../definitions"
import client from "../apollo"
import { gql } from "@apollo/client";
import { flattenStrapiResponse } from "./helpers";
import { BlogArticleStub } from "../definitions";

const getPage = async (page = 0, pageSize = 20): Promise<PaginatedData<BlogArticleStub>> => {
  const resp = await client.query({
    query: queryArticles,
    variables: {
      pagination: {
        page,
        pageSize,
      },
    }
  })
  const dataArr = resp.data.blogArticles.data as any[];
  const articles = dataArr.map(article => {
    const flat = flattenStrapiResponse({ article: { ...article.attributes, id: article.id } });
    return formatArticleFromApiResponse(flat.article);
  });
  return {
    data: articles,
    pagination: { ...flattenStrapiResponse(resp.data.blogArticles.meta) }
  }
}

export const articles = {
  getPage,
}

const queryArticles = gql`query blogArticles($pagination: PaginationArg, ) {
    blogArticles(pagination: $pagination) {
      data {
        id,
        attributes {
          synopsis,
          title,
          image {
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

const formatArticleFromApiResponse = (article: any): BlogArticleStub => {
  const host = process.env.HOST;
  if (!host) throw new Error('HOST ENV VARIABLE NOT SET');
  return {
    title: article.title,
    image_url: host.concat(article.image.url),
    link: '/#',
    synopsis: article.synopsis,
  }
}