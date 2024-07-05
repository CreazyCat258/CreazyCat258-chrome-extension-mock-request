# 谷歌浏览器插件开发练手



## 当前实现效果
+ 点击插件后，打开一个新的窗口，方便后续操作



## panels 介绍
一个 webpack 管理的 react 项目，也是插件启动的窗口中的内容

本地启动：
+ `cd panels`
+ `npm run start`

打包：
+ `cd panels`
+ `npm run build`
+ `panels/dist` 为打包产物


## Tips
### 更换插件打开的窗口中的内容 
当前插件打开的窗口，其引用的是 `panels/dist/index.html`，因此：
+ 可以更改 `panels/dist/index.html` 对应的具体页面，理论上任何一个已有项目打包后的dist产物，将其放到panels下都可以完美替换
+ 还可以更改 `service_worker.js` 文件内，`chrome.windows.create` 时的 url 路径为自己想要的路径，然后在对应位置添加指定文件即可