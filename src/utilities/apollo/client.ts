"use client"

import {
  ApolloLink,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client"
import { onError } from '@apollo/client/link/error'

import { setContext } from "@apollo/client/link/context"
import RefreshToken from "./graphql/mutations/refreshToken.graphql"
import { setCookie } from "../helpers/cookies"

function resetLocalStorage() {
  setCookie('token', null)
  localStorage.removeItem('token')
  setCookie('refreshToken', null)
  localStorage.removeItem('refreshToken')
}

export function makeClient() {
  const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            httpLink,
          ])
        : httpLink,
  })
}

export function makeProtectedClient() {
  const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
  })

  const retryLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors && operation.operationName !== "refreshToken") {
      const hasUnauthenticatedError = graphQLErrors.filter(e => e.extensions.code === "UNAUTHENTICATED").length
      if (hasUnauthenticatedError) {
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
          const client = new ApolloClient({
            cache: new InMemoryCache(),
            uri: process.env.NEXT_PUBLIC_API_URL,
            headers: {
              'Refresh-Token': JSON.parse(refreshToken || '')
            }
          })
          client.mutate({
            mutation: RefreshToken,
          }).then((response: any) => {
            const token = response.data.refreshToken.token
            localStorage.setItem('token', JSON.stringify(token))
            setCookie('token', token)
            forward(operation)
          }).catch(() => {
            resetLocalStorage()
          })
        } else {
          resetLocalStorage()
        }
      }
    } else {
      resetLocalStorage()
    }
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token")

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${JSON.parse(token)}` : "",
      }
    }
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            retryLink.concat(authLink).concat(httpLink),
          ])
        : retryLink.concat(authLink).concat(httpLink),
  })
}
