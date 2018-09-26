const axios = require('axios');

const client = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 100000,
});

module.exports = {
  getChairPolys: async () => {
     try {
       const url = `/CHAIR_INFO/`;
       const response = await client.get(url);
       return response.data;
     } catch (error) {
        console.error(error);
     }
     return [];
   },
}
