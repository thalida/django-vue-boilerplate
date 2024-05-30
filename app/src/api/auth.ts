import api from './index'
import type { IAuthLoginRequest, IAuthTokenResponse } from '@/types/auth'

export function googleLogin(accessToken: string) {
  return api.post(
    '/auth/convert-token/',
    {
      grant_type: 'convert_token',
      client_id: import.meta.env.VITE_API_CLIENT_ID,
      client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
      backend: 'google-oauth2',
      token: accessToken
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

export function emailLogin(data: IAuthLoginRequest) {
  return api.post(
    '/auth/token/',
    {
      grant_type: 'password',
      client_id: import.meta.env.VITE_API_CLIENT_ID,
      client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
      ...data
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

export function refreshToken(refreshToken: string) {
  return api.post(
    '/auth/token/',
    {
      grant_type: 'refresh_token',
      client_id: import.meta.env.VITE_API_CLIENT_ID,
      client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
      refresh_token: refreshToken
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

export function revokeToken({
  access_token: accessToken,
  token_type: tokenType
}: IAuthTokenResponse) {
  return api.post(
    '/auth/revoke-token/',
    {
      client_id: import.meta.env.VITE_API_CLIENT_ID,
      client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
      token: accessToken
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenType} ${accessToken}`
      }
    }
  )
}

export default {
  googleLogin,
  emailLogin,
  refreshToken,
  revokeToken
}
