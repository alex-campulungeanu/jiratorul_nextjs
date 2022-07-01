const dev = process.env.NODE_ENV !== 'production'

export const SERVER_API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL || 'http://localhost:3300/dev';

const config = {
  proxy: process.env.http_proxy,
}

const TOKEN_NAME='token'
const STORAGE_USER_CONTAINER = 'user'

export {
  config,
  TOKEN_NAME,
  STORAGE_USER_CONTAINER
}