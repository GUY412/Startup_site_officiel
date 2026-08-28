import { createContext, useContext, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { api, clearToken, getToken, setToken } from './api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken())

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      async login(email, password) {
        const data = await api.login(email, password)
        setToken(data.token)
        setTokenState(data.token)
        return data.admin
      },
      logout() {
        clearToken()
        setTokenState(null)
      },
    }),
    [token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}

export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}
