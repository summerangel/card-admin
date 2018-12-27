项目运行：

1、安装相关依赖，打开终端执行命令： `yarn`
2、安装好，在根目录下新建一个文件 .env.local,里面内容：

```javascript
proxy1=/mock/*=https://dsn.apizza.net
proxy2=/gw/*=http://gw.freeexchange.cn
proxy3=/test/*=http://gw.freeexchange.cn
```

3、安装好后，运行： `yarn start`,浏览器会自动打开：http://localhost:3000/admin/

4、打包： `yarn run build`, 将生成的 build 文件放到服务器上
