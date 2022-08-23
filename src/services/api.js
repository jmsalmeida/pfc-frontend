const Frisbee = require('frisbee')

export const api = new Frisbee({
  baseURI: 'http://10.0.2.2:3000',
  headers: { 'Content-type': 'application/json; charset=utf-8' },
})
