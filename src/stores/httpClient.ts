import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_PROD_API,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})
