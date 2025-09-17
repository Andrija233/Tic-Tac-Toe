import { gql } from "@apollo/client";
import client from "./client";
import type { ResponseLogin, ResponseRegister } from "../../types/graph";
import type { AuthResponse } from "../auth";
import { handleGraphqlError } from "../../utils/handleGraphError";

export const AUTH_RESPONSE_FIELDS = gql`
  fragment AuthResponseFields on AuthResponse {
    token
    user {
      id
      username
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      ...AuthResponseFields
    }
  }
  ${AUTH_RESPONSE_FIELDS}
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...AuthResponseFields
    }
  }
  ${AUTH_RESPONSE_FIELDS}
`;

export const register = async(username: string, password: string) : Promise<AuthResponse | undefined> => {
  try{
    const res = await client.mutate<ResponseRegister>({
    mutation: REGISTER,
    variables: { username, password },
    });
    if (!res.data) {
      throw new Error("No data returned from register");
    }
    return res.data?.register;
  } catch (err) {
    handleGraphqlError(err, "Failed to register");
  }
}

export const login = async(username: string, password: string) : Promise<AuthResponse | undefined> => {
  try {
    const res = await client.mutate<ResponseLogin>({
    mutation: LOGIN,
    variables: { username, password },
    });
    if (!res.data) {
      throw new Error("No data returned from login");
    }
    return res.data?.login;
  } catch (err) {
    handleGraphqlError(err, "Failed to login");
  }
}
