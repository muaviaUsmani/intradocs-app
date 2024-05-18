"use client"
import { setCookie } from "@/utilities/helpers/cookies"
import { useState, useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"

export default function useAuth() {
  const [token,, removeToken] = useLocalStorage("token", null)
  const [,, removeRefreshToken] = useLocalStorage("refreshToken", null)
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token))

  function logout() {
    setCookie("token", null)
    removeToken()
    setCookie("refreshToken", null)
    removeRefreshToken()
  }

  useEffect(() => {
    setIsAuthenticated(Boolean(token))
  }, [token])

  return { isAuthenticated, logout }
}
