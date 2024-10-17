import axios from 'axios'

const baseURL = import.meta.env.PROD
  ? 'https://www.klerk.ru'
  : 'https://www.klerk.ru'

export const httpClient = axios.create({
  baseURL,
})
