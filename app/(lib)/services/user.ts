import client from "../apollo"
import { gql } from "@apollo/client";
import { User } from "../definitions";

export const getUser = async (identifier:string, password:string):Promise<User|null> => {
    const resp = await client.mutate({
        mutation: loginMutation,
        variables: {
            identifier,
            password,
        }
    })
    const result = resp.data ? {
        id: resp.data.login.user.id,
        name: resp.data.login.user.username,
        email: resp.data.login.user.email,
    } : null;
    return result;
}

const loginMutation = gql`mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        email
        id
      }
    }
  }`