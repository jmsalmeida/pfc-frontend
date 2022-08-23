import { ENV } from '../config/envinroments'
const Frisbee = require('frisbee')

export const api = new Frisbee({
  baseURI: process.env.REACT_APP_API_URL,
  headers: { 'Content-type': 'application/json; charset=utf-8' },
})
