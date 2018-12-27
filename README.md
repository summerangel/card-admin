# operator-pc

node 版本：v8.\*

## http request

### example

```js
import { request } from './src/modules/request';

request.get('https://example.com', { a: 1, b: 2 }).then(
  res => {
    // ...
  },
  error => {
    // ...
  }
);

// URL 带参数
// get: https://example.com/1/2?a=a&b=b
request.get('https://example.com/:userId/:param2', { a: 'a', b: 'b' }, { restParams: { userId: 1, param2: 2 } }).then(
  res => {
    // ...
  },
  error => {
    // ...
  }
);
```

### proxy

本地代理请求设置

在根目录下建立 `.env.local` 或 `.env.development.local` 文件，设置代理请求的路径与地址:

```
proxy1=/api/*=http://test-1.yilou.17shihui.com
proxy2=/b/*=http://test-2.yilou.17shihui.com
```

也可以在 `package.json` 文件中设置 `proxy` 字段

```json
{
  "proxy": {
    "/api/*": {
      "target": "http://yl-phzc.test.yilou.17shihui.com",
      "secure": false,
      "changeOrigin": true
    }
  }
}
```
