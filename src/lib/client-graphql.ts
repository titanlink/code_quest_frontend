// import { getSession } from "@/actions/auth/login-action";
// import { auth } from "@/auth";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export async function makeClientGraphql(token: string = "SIN TOKEN") {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_URL_GQL}/graphql`,
    // fetchOptions: { cache: "no-store", timeoutPromise },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // getsession['headers']
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}
