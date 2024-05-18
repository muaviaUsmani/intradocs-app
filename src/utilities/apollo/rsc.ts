import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client"
import { getCookie } from "@/utilities/helpers/cookies"

export default function getSSRClient() {
  const token = getCookie('token')

  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: process.env.API_URL,
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }),
    cache: new InMemoryCache(),
  })
}
