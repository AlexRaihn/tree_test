import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_PROD_API ?? 'www.klerk.ru',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})
