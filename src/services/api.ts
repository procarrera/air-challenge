import axios from 'axios'

export const airAPI = axios.create({
  baseURL: 'https://api.air.inc/shorturl/bDkBvnzpB',
  headers: {
    accept: 'application/json',
    'accept-language': 'en-US,en;q=0.9',
    authorization: '',
    'content-type': 'application/json',
    'x-air-board-context': '',
  },
})
