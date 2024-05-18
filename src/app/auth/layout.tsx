"use client"

import { useEffect } from "react"
import { ApolloProvider } from "@apollo/client"
import { makeClient } from "@/utilities/apollo/client"
import useAuth from "@/utilities/hooks/useAuth"
import { redirect } from "next/navigation"

import styles from "./styles.module.scss"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      redirect(`/dashboard`)
    }
  }, [isAuthenticated])

  return (
    <ApolloProvider client={makeClient()}>
      <div className={styles.root}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </div>
    </ApolloProvider>
  )
}
