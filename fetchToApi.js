let fetch = require('node-fetch');

const fetchToApi = async (url) => {
  const data = await fetch(url);
  const result = await data.json();

  console.log(result);
  return result;
};

module.exports = fetchToApi;
