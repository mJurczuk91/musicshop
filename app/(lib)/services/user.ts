import client from "../apollo"
import { gql } from "@apollo/client";
import { User } from "../definitions";

export const getUser = async (identifier:string, password:string):Promise<User|null> => {
    try {
        const resp = await client.mutate({
            mutation: loginMutation,
            variables: {
                identifier,
                password,
            }
        })
        const result = {
            id: resp.data.login.user.id as string,
            name: resp.data.login.user.username as string,
        };
        return result;
    } catch(e){
        return null;
    }
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