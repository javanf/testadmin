## 前言
后台管理系统前端框架，现在很流行的形式都是，上方和左侧都是导航菜单，中间是具体的内容。比如阿里云、七牛云、头条号、百家号等等，他们的管理系统都是这样的。

![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318094322.png)


现在我们从零开始，给小伙伴们讲讲如何来搭建这样的一个前端页面框架，主要用到 VUE + Element UI。

## 生成项目
用Vue脚手架初始化一个基于 webpack 模板的新项目
```bash
vue init webpack testadmin
```

![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318103223.png)

一路向下，会提示你项目名称、项目描述、作者、是否安装vue-router(这里选择Y，后面需要用到)、ESLint等，看自己情况选择输入咯。

现在他会自动帮你`npm install`安装项目需要的模块，如果你的版本没有自动安装的话，没有关系，我们切换到项目目录（如`cd testadmin`）。执行

```bash
npm install
```

如果觉得半天没有反应，是因为 `npm` 要安装的包都是国外服务器上的，把`npm`资源镜像改到`淘宝镜像`即可。

### npm 镜像地址配置

1、得到原本的镜像地址
```bash
npm get registry 
> https://registry.npmjs.org/
```

2、设成淘宝的
```bash
npm config set registry http://registry.npm.taobao.org/
> yarn config set registry http://registry.npm.taobao.org/
```

3、换成原来的
```bash
npm config set registry https://registry.npmjs.org/
```

ok， 这时候运行`npm run dev`即可看到初始化后的项目了。

```bash
npm run dev
```

![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318104143.png)


项目目录结构预览，以及package.json解析。
![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318104557.png)



下面我们来集成Element UI，搭建框架。

## VUE + Element UI

### 安装并引入
同样我们在项目的根目录安装`Element UI`
```bash
npm i element-ui -S
```

然后我们打开修改/src/main.js文件，引入`element-ui`。
```javascript
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
```

### Container 布局组件
在src目录下，新建page文件夹(作为所有业务页面目录)，然后在page下面新建layout.vue（作为框架结构文件）。

然后在layout.vue用运用Element UI Container 布局容器组件。

![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318110155.png)

Container，用于布局的容器组件，方便快速搭建页面的基本结构：

`<el-container>`：外层容器。当子元素中包含 `<el-header>` 或 `<el-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<el-header>`：顶栏容器。
`<el-aside>`：侧边栏容器。
`<el-main>`：主要区域容器。

![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318110634.png)


然后修改路由`/src/router/index.js`文件
```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    }
  ]
})
```

启动服务（`npm run dev`）预览（如果之前已经启动，就不用了，集成了webpack支持热更新）。

![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318111113.png)



### NavMenu 导航菜单 组件
直接复制下图里面的代码，到layout.vue，`<el-header>`、`<el-aside>`位置，然后微调样式即可。

![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318112255.png)


预览：
![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318112637.png)


但是会发现一个问题，下方有很大一部分空白区域，理论上，下方应该是沾满的，不会有任何空白的地方，这时候我们需要修改一样样式，来满足这个需求。

修改`/src/page/layout.vue`里面的样式：

```css
.el-container{
  position: absolute; 
  width: 100%; 
  top: 0px ; 
  left: 0 ; 
  bottom: 0;
}
.el-header{
  padding: 0;
  z-index: 1000;
}

// header菜单需要靠右的添加.fr即可(如：<el-menu-item class="fr" index="3">消息中心</el-menu-item>)
.el-header .fr{
  float: right;
}
.el-header .el-menu{
  border-bottom: none;
}
.el-aside, .el-main{
  padding-top: 60px;
}
.el-aside{
  background: #545c64;
}
.el-aside .el-menu{
  border-right: none;
}
```


然后在`/src/App.vue`里面添加样式：
```css
*{
  padding: 0;
  margin: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
}
```

![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318114316.png)


## Vue Router 嵌套路由
接下来，`<el-main>`肯定是所有其它页面的展示区域，这里涉及到一个知识点：Vue 嵌套路由。

举例：当前我们的路由是`localhost:8080`，打开的是layout.vue文件，如果路由改成`localhost:8080/main`，需要打开main.vue的内容，如果路由改成`localhost:8080/user`，需要打开user.vue的内容...怎么实现这个功能了？

Vue 嵌套路由来帮我们解决这个问题！

我们先在page目录下面新建2个文件`main.vue`、`user.vue`。

main.vue
```html
<template>
  <div id="main">
    <h2>我这里是首页</h2>
    <router-link to="/user">前往用户中心</router-link>
  </div>
</template>

<script>
export default {
  name: 'main'
}
</script>
```

user.vue
```html
<template>
  <div id="user">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>用户中心</h2>
  </div>
</template>

<script>
export default {
  name: 'User'
}
</script>
```

然后重点来了，嵌套路由。

修改`/src/router/index.js`路由文件：
```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout'
import Main from '@/page/main'
import User from '@/page/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      // 嵌套路由
      children: [{
        // 这里不设置值，是把main作为默认页面
        path: '/', 
        name: 'Main',
        component: Main
      },{
        path: '/user',
        name: 'User',
        component: User
      }]
    }
  ]
})
```

同时在'/src/page/layout.vue'里面的`<el-main>`里面添加`<router-view/>`:
```html
...
<el-main><router-view/></el-main>
...
```

效果预览：

![从零开始搭建 VUE + Element UI后台管理系统框架](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190318114317.gif)

是不是还意犹未尽了？其实到这里已经结束了。希望能给刚刚入门或者还在学习的小伙伴带来帮助，如果觉得文章看起来不是很好的，可以在评论取评论，看大家的评论情况，推出视频教程。