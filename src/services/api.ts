import axios from 'axios'

export const airAPI = axios.create({
  baseURL: 'https://api.air.inc/shorturl/bDkBvnzpB',
  headers: {
    accept: 'application/json',
    'accept-language': 'en-US,en;q=0.9',
    authorization: '',
    'content-type': 'application/json',
    origin: 'https://app.air.inc',
    referer: 'https://app.air.inc/',
    'sec-ch-ua':
      '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'x-air-board-context': '',
  },
})
