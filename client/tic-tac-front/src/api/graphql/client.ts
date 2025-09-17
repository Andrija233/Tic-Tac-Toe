import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

const GRAPHQL_URL = import.meta.env.GRAPHQL_API_URL || "http://localhost:4000/graphql";

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});

export default client;