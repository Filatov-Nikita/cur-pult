import ky from 'ky';

const api = ky.create({
  prefixUrl: process.env.API_HOST
});

export default api;
