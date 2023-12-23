import { createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null}
  onRegister?: (name: string, email: string, password: string, firstName: string, lastName: string) => Promise<any>
  onLogin?: (identifier: string, password: string) => Promise<any>
  onVerification?: (otp: string) => Promise<any>
  onResend?: () => Promise<any>
  onLogout?: () => Promise<any>
}

const TOKEN_KEY = 'my-jwt'
const EMAIL = 'my-email'
export const API_URL = 'https://notes-app-otp-back-end.up.railway.app/api/v1/'
const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null,
    authenticated: boolean | null
  }>({
    token: null,
    authenticated: null
  })

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY)

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        setAuthState({
          token: token,
          authenticated: true
        })
      }
    }
  }, [])

  const register = async (name: string, email: string, password: string, firstName: string, lastName: string) => {
    try {
      const result = await axios.post(`${API_URL}register`, { name, email, password, firstName, lastName })
      await SecureStore.setItemAsync(EMAIL, email)
      return result
    } catch (error) {
      return { error: true, message: (error as any).response.data.message }
    }
  }

  const resendOtp = async () => {
    try {
      const email = await SecureStore.getItemAsync(EMAIL)
      const result = await axios.post(`${API_URL}resend-otp`, { email })
      return result
    } catch (error) {
      return { error: true, message: (error as any).response.data.message }
    }
  }

  const verification = async (otp: string) => {
    try {
      const email = await SecureStore.getItemAsync(EMAIL)
      const result = await axios.post(`${API_URL}verify`, { email, otp: parseInt(otp) })
      return result
    } catch (error) {
      return { error: true, message: (error as any).response.data.message }
    }
  }

  const login = async (identifier: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}login`, { identifier, password })

      setAuthState({
        token: result.data.accessToken,
        authenticated: true
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`
      await SecureStore.setItemAsync(EMAIL, identifier)
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken)
      return result
    } catch (error) {
      return { error: true, message: (error as any).response.data.message }
    }
  }

  const logout = async () => {
    await axios.delete(`${API_URL}logout`)
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    axios.defaults.headers.common['Authorization'] = ''

    setAuthState({
      token: null,
      authenticated: false
    })
  }

  const value = {
    authState: authState,
    onRegister: register,
    onLogin: login,
    onVerification: verification,
    onResend: resendOtp,
    onLogout: logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}