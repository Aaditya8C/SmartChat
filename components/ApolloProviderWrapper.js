import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from, split } from "@apollo/client";
import React, { useMemo } from "react";
import { SSELink, isLiveQuery } from "@grafbase/apollo-link";
import { setContext } from "@apollo/client/link/context";
import { getOperationAST } from "graphql";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL,
});

const sseLink = new SSELink({
  uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL,
});

const ApolloProviderWrapper = ({ children }) => {
  // an Apollo Client instance is created
  const client = useMemo(() => {
    const authMiddleWare = setContext(async (_, { headers }) => {
      const { token } = await fetch("/api/auth/token").then((res) =>
        res.json()
      );

      // adds the JWT token obtained from the /api/auth/token endpoint to the request headers
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    });

    return new ApolloClient({
      link: from([
        authMiddleWare,
        // determines whether to use the SSE link (sseLink) or the HTTP link (httpLink) based on whether the query is a live query.
        split(
          ({ query, operationName, variables }) =>
            isLiveQuery(getOperationAST(query, operationName), variables),
          sseLink,
          httpLink
        ),
      ]),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};  

export default ApolloProviderWrapper;


