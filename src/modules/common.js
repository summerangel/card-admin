import { request } from './request';
import Constant from './constant';
import _ from 'lodash';
import { message } from 'antd';

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

export const msg = (type, info) => {
  message[type](info);
};

function errorHandle(e) {
  message.error(e.responseMsg || '网路连接异常');
}

export class Common {
  static formatTypeStr = (value, dataParams, text) => {
    let textValue = text ? text : 'value';
    return _.result(_.find(Constant.queryParams(dataParams), { key: value }), textValue);
  };
  /**
   * 获取url参数
   * 使用方式：getQueryString.key 这里的key是你参数名
   * @returns
   */
  static getQueryString(name) {
    const search = document.location.search ? document.location.search : window.location.hash;
    const pattern = new RegExp('[?&]' + name + '=([^&]+)', 'g');
    const matcher = pattern.exec(search);
    let items = null;
    if (null != matcher) {
      try {
        items = decodeURIComponent(decodeURIComponent(matcher[1]));
      } catch (e) {
        try {
          items = decodeURIComponent(matcher[1]);
        } catch (e) {
          items = matcher[1];
        }
      }
    }
    return items;
  }
  /**
   * 数据请求
   * get post
   */
  static get = (url, params = {}, restParams = {}) => {
    return request.get(url, params, restParams).catch(errorHandle);
  };
  static post(url, params = {}, restParams = {}) {
    return request.post(url, params, restParams).catch(errorHandle);
  }
}
