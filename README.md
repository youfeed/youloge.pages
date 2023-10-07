# Youloge.Pages

这是站点`https://pages.youloge.com`的源码，项目依赖[Youloge.UI](https://github.com/youfeed/youloge.ui):这是用来纯静态部署的一个项目，方便部署到各种云盘，CDN等服务。

如果你喜欢这个项目，欢迎star和fork。

- youloge.com/drive 云盘文件服务单页
- youloge.com/article 文章单页

##### 以下是部署参考：

- 托管到`Github Pages` [.guithub/deploy.yml](https://github.com/youfeed/youloge.pages/blob/main/.github/workflows/deploy.yml) 

### 编译注意
- 运行 `npm run build` 
- html 结尾是多入口：静态资源托管服务一般都支持`默认.html访问`=> `pages.youloge.com/article`,`pages.youloge.com/article.html`
- views下文件夹是hash-view的文件路由文件：编译成异步vue 懒加载组件自带权限(适合集合成后台)
```
dist/article.html                               0.62 kB │ gzip: 0.34 kB
dist/index.html                                 0.65 kB │ gzip: 0.36 kB
dist/assets/index-f5b850e4.css                  0.03 kB │ gzip: 0.05 kB
dist/assets/article-aa85ff82.js                 0.24 kB │ gzip: 0.21 kB
dist/assets/index-c9288518.js                   0.56 kB │ gzip: 0.44 kB
dist/assets/welcome-2159e70f.js                 0.71 kB │ gzip: 0.40 kB
...
```
你会发现编译出来的文件都是`<~10kb`的小文件，推荐CDN引入`vue + youloge`等依赖;


> 由于`Github Pages` 站点在国内访问速度慢且会有一些并发限制

也推荐使用`Github Webhook`的方式将`Github Pages`的编译`dist`部署到自己服务器去。

---

### 友情link `提交站点通过issue`

- [pages.youloge.com](https://pages.youloge.com) - 官方演示站点


