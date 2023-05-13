const callApi = async (method, url, data = '') => {
  const response = await axios({
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
    url,
    data,
  });

  return response;
};

export default callApi;
