# Youloge.Pages

这是站点`https://pages.youloge.com`的源码，如果你喜欢这个项目，欢迎star和fork。

- youloge.com/drive 云盘文件服务单页

##### 以下是部署参考：

- [pages.youloge.com](https://pages.youloge.com) 托关于`Github Pages`

### 编译注意
运行 npm run build
```
dist/article.html                               0.62 kB │ gzip: 0.34 kB
dist/index.html                                 0.65 kB │ gzip: 0.36 kB
dist/assets/index-f5b850e4.css                  0.03 kB │ gzip: 0.05 kB
dist/assets/article-aa85ff82.js                 0.24 kB │ gzip: 0.21 kB
dist/assets/index-c9288518.js                   0.56 kB │ gzip: 0.44 kB
dist/assets/modulepreload-polyfill-3cfb730f.js  0.71 kB │ gzip: 0.40 kB
```
你会发现编译出来的文件都是`<~20kb`的小文件，其他文件使用`CDN` 方式引入

`public > npm` 是依赖可以换成`bootcdn`之类的

> 由于`Github Pages` 站点在国内访问速度慢且会有一些并发限制

更推荐使用`Github Webhook`的方式将`Github Pages`的编译`dist`部署到自己服务器去。

---

`可以提交你的站点通过issue`以后`youloge.com` 根域名会整合资源并指向到你们的站点去。


