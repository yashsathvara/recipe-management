const api = axios.create({
  baseURL: 'http://localhost:5000/recipes',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
