// import { getSession } from "@/actions/auth/login-action";
// import { auth } from "@/auth";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// Create a timeout promise that resolves after 10 seconds
function createTimeoutPromise(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Error("Request timed out"));
    }, time);
  });
}
//131
export async function makeClientGraphql(time: number = 10000) {
  // const session = await auth();
  // const token = session?.user.token
  const token = ''

  const timeoutPromise = createTimeoutPromise(time);

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL_GQL,
    // fetchOptions: { cache: "no-store", timeoutPromise },
    headers:{
      Authorization: `Bearer ${token}`,
      client: 'TiH39eghX0IKlf7rVU5n3Q',
      expiry: '1755268722',
      'access-token': 'QkN7zAyHVoHLgT2lfhkYqQ',
      'token-type': 'Bearer',
      uid: 'lucho@gmail.com'
    }
    // getsession['headers']

  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}
