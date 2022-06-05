const Frisbee = require('frisbee');

export const api = new Frisbee({
  baseURI: 'http://localhost:3000',
  headers: { 'Content-type': 'application/json; charset=utf-8' }
});