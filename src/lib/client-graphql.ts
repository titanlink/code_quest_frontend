// import { getSession } from "@/actions/auth/login-action";
// import { auth } from "@/auth";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useAuth } from ".";
import { getAuthToken } from "./auth-utils";


export async function makeClientGraphql(token: string = 'SIN TOKEN') {
  // console.log("🚀 ~ makeClientGraphql ~ token: =>", token)
  // const session = await auth();
  // const token = session?.user.token
  // const token = await getAuthToken() ?? 'vacio'


  // token =  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwMDZlMjc5MTVhMTcwYWIyNmIxZWUzYjgxZDExNjU0MmYxMjRmMjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTHVpcyBBbmdlbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJRXY0RlpJTExGa0pHVm91RE9NcHJ0Y3hSTlJfdTZJQTNmR2YxdzZERWJZeml2NWdBPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NvZGUtcXVlc3QtMjAyNSIsImF1ZCI6ImNvZGUtcXVlc3QtMjAyNSIsImF1dGhfdGltZSI6MTc1ODA0MzY2NSwidXNlcl9pZCI6InM0QWYzQVFxeHRnZ3czZ1JXdURjUlg2UUQ1OTIiLCJzdWIiOiJzNEFmM0FRcXh0Z2d3M2dSV3VEY1JYNlFENTkyIiwiaWF0IjoxNzU4MDQ4MDI4LCJleHAiOjE3NTgwNTE2MjgsImVtYWlsIjoib3ZpdGFuMTVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDczNjYzNTc2MzgwODE2NDEwMDEiXSwiZW1haWwiOlsib3ZpdGFuMTVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.PSVGuTszEZTpqw-aKP7Y7bdEcg5qsGgJgBaVM4gDDB5cLlEgpLEY-jC8r-x4e7ZOs8nLbUqLj45vYQPUE7WMXXZd11lIcw_hHEygV-l_aQ2YXpDmZ9kYSsALWw5Dx4uLvD34qhrWuj7XIOBRQXbKuRquakZKdk0yUqq2V_VUWZGGKdZAGx7jNl6qsGPig5yifmELwSeTJxNBUFzxs_uKX9hdE3WYOJyg_zkRts-scKC5c8ZBVltmbVcGGe7MfInZj562AwZrX6wWJWtJ1joQ3cLSmqRJ3x2ELrMCUJ033uDiofihEmGH1vePAg54cul-NUch87Hc45wQ2KMld2afpw'
  // console.log("🚀 ~ makeClientGraphql ~ token:", token)
  // const token = await getToken() ?? ''


  const httpLink = new HttpLink({
    uri:`${process.env.NEXT_PUBLIC_BACKEND_URL_GQL}/graphql`,
    // fetchOptions: { cache: "no-store", timeoutPromise },
    headers:{
      'Authorization': `Bearer ${token}`,
    }
    // getsession['headers']

  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}
