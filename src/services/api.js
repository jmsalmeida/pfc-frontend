import { ENV } from '../config/envinroments';

const Frisbee = require('frisbee');

export const api = new Frisbee({
  baseURI: ENV.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json; charset=utf-8',
  },
});
