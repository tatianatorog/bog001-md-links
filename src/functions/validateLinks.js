
const axios = require('axios');

const linkValidate = (url, text, file) => new Promise((resolve) => axios
  .get(url)
  .then((res) => resolve({
    url,
    text,
    file,
    status: res.status,
    statusText: res.statusText,
  }))
  .catch(() => resolve({
    url,
    text,
    file,
    status: 404,
    statusText: 'FAIL',
  })));

const resolveValidate = (links) => {
  const linksValidatePromises = [];
  links.forEach(({ href, text, file }) => {
    let url = href;
    if (!/^https?:\/\//i.test(href)) {
      url = `http://${href}`;
    }
    return linksValidatePromises.push(linkValidate(url, text, file));
  });
  return Promise.all(linksValidatePromises)
  .then((stats) =>stats)
  .catch(
    () => new Error('No internet connection'),
  );
};

module.exports = resolveValidate
