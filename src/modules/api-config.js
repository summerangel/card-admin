const host = ''; //'http://combsout.ejubc.com';

export const api = {
  LOGIN_MOCK: '/user/login-mock/:userId',
  LOGIN_SEND_CODE: '/user/login/send-code',
  LOGIN_VERIFY_CODE: '/user/login/verify-code',
  LOGIN_VERIFY_PWD: '/user/login/verify-pwd',
  USER_USER_DETAIL: '/user/detail',

  GW_INTERACT_API: '/gw/interact',
};
export const formatRestfulUrl = function(url, params) {
  if (!params || url.indexOf(':') < 0) return url;
  let parts = url.split('/');
  let partIndex = 0;
  const isArray = Array.isArray(params);
  parts.forEach(function(ele, index) {
    if (ele.indexOf(':') === 0) {
      parts[index] = isArray ? params[partIndex] : params[ele.substring(1)];
      partIndex++;
    }
  });
  return parts.join('/');
};

const restRegex = /\/:/g;
export const numberOfRestParams = function(url) {
  const matched = url.match(restRegex);
  return matched ? matched.length : 0;
};
