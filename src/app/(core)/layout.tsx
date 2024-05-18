"use client"

import { useEffect } from "react"
import { ApolloProvider } from "@apollo/client"
import { makeProtectedClient } from "@/utilities/apollo/client"
import useAuth from "@/utilities/hooks/useAuth"
import { usePathname, redirect } from "next/navigation"

import styles from "./styles.module.scss"
import Header from "@/components/Header"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()


  useEffect(() => {
    if (!isAuthenticated) {
      redirect(`/auth/login?next=${pathname}`)
    }
  }, [pathname, isAuthenticated])

  return (
    <ApolloProvider client={makeProtectedClient()}>
      <Header />
      <div className={styles.root}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </div>
    </ApolloProvider>
  )
}
