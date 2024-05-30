import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAuthLoginRequest, IAuthTokenResponse } from '@/types/auth'
import authApi from '@/api/auth'
import { LOCALSTOARGE_NAMESPACE } from '.'

export const useAuthStore = defineStore('auth', () => {
  const TOKEN_STORAGE_KEY = `${LOCALSTOARGE_NAMESPACE}:tokenData`
  const isAuthenticated = ref(false)

  function setTokenData(data: IAuthTokenResponse) {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(data))

    isAuthenticated.value = true
  }

  function getTokenData() {
    const data = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (data) {
      return JSON.parse(data) as IAuthTokenResponse
    }

    return null
  }

  function clearTokenData() {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    isAuthenticated.value = false
  }

  async function logout() {
    const tokenDataCopy = getTokenData()

    clearTokenData()

    if (tokenDataCopy !== null) {
      await authApi.revokeToken(tokenDataCopy)
    }
  }

  async function silentLogin() {
    const tokenData = getTokenData()

    if (tokenData === null) {
      clearTokenData()
      return
    }

    try {
      const res = await authApi.refreshToken(tokenData.refresh_token)
      setTokenData(res.data)
    } catch (error) {
      clearTokenData()
    }
  }

  async function loginWithEmail(data: IAuthLoginRequest) {
    try {
      const res = await authApi.emailLogin(data)

      setTokenData(res.data)
    } catch (error) {
      clearTokenData()
      throw error
    }
  }

  async function loginWithGoogle(accessToken: string) {
    try {
      const res = await authApi.googleLogin(accessToken)
      setTokenData(res.data)
    } catch (error) {
      clearTokenData()
      throw error
    }
  }

  return {
    isAuthenticated,
    setTokenData,
    getTokenData,
    clearTokenData,
    logout,
    silentLogin,
    loginWithGoogle,
    loginWithEmail
  }
})
