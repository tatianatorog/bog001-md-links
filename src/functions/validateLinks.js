const axios = require('axios');

const resolveValidate = (getLinksUrl) => {
  const arrValidate = getLinksUrl.map((link) => {
    let url = link.href;
    if (!/^https?:\/\//i.test(url)) {
      url = `http://${url}`;
    }
    return axios.get(url)
      .then((res) => ({ ...link, status: res.status, statusText: res.statusText }))
      .catch(() => ({
        ...link, status: 404, ok: false, statusText: 'FAIL',
      }));
  });

  return Promise.all(arrValidate);
};

module.exports = resolveValidate;
