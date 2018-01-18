![mahua](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514286148704&di=617c729a0d97555852e0c440305abf46&imgtype=0&src=http%3A%2F%2Fwww.meipo360.com%2FUpload%2Fimage%2F2015%2F0403%2F20150403103311235799.png)

## 目录  
* [项目背景](#项目背景) 
* [浏览器支持](#浏览器支持)  
* [项目的基础结构](#项目的基础结构)  
* [项目的特色应用](#项目的特色应用) 
* [项目的部署运行](#项目的部署运行) 
  * [本地配置](#本地配置)  
  * [使用Api接口](#使用Api接口)  
* [路由配置](#路由配置)
* [项目的发展方向](#项目的发展方向)  
* [相关文档链接](#相关文档链接)  
* [主要维护者](#主要维护者) 
* [版权许可证](#版权许可证)  

<a name="项目背景"></a>  

## 项目背景

北京品友互动信息技术有限公司（简称品友互动），创立于2008年，是中国领先的基于大数据技术的人工智能平台，是最早将程序化购买引入中国的企业之一。

pyff-vue-sample的设计初衷是品友互动给大家提供一个除vue-cli上传统模板外的自定义vue项目模板。

pyff-vue-sample在路由、自动化、缓存组件上有了很大的突破，高度适用各种独立的前端项目。

<a name="浏览器支持"></a>  

## 浏览器支持

Modern browsers and IE 10+。

[![testling badge](https://ci.testling.com/substack/ever.png)](https://ci.testling.com/substack/quote-stream)


<a name="项目的基础结构"></a>  

## 项目的基础结构

* build - webpack config files
* config - webpack config files
* src -your app
    * api
    * assets
    * mock
    * store
    * views - your pages
    * App.vue
    * main.js - main file
    * routes.js
    * routes-temple.js

<a name="项目的特色应用"></a> 

## 项目的特色应用
``` bash

1. 简洁轻量
    
    pyff-vue-sample核心部分仅几兆,目录结构一目了然

2. 构建快速
    
    构建项目简单迅速，新手简单易学，上手快
  
3. 数据驱动
    
    驱动应用的数据源，以声明方式将数据源映射到视图  

4. 模块友好
    
    模块清晰，分工明确，低耦合，高内聚

5. 组件化
    
    组件化明确，完全有能力驱动采用单文件组件来开发的更为复杂的单页应用     

```
<a name="项目的部署运行"></a>  

## 项目的部署运行

<a name="本地配置"></a> 

### 本地配置  

``` bash
# install dependencies
npm run init

# serve with hot reload at localhost:3000
npm run dev

# build for production with hot reload at localhost:8080
npm run start

# build for production with minification
npm run build

```
<a name="使用Api接口"></a> 

### 使用Api接口


``` bash
以登录接口为例。在src/api/api.js中定义接口
  
const base = '';
  
export const requestLogin = params => axios.post(`${base}/login`, params);  
  
通过axios向api接口发送get或者post请求。
  
在src/views/Login.vue中引入api.js抛出的方法并使用
  
import { requestLogin } from 'api';
  


```

### 路由配置

``` bash
在src/routes-temple.js中定义路由，项目会自动在routes.js中配置好相关路径信息

 {
    path: '/',
    component: Helloworld,
    name: 'hello',
    iconCls: 'py-icon-message', // 图标样式class
    children: []
  }
  
```

<a name="项目的发展方向"></a> 

## 项目的发展方向

* demo展示时，提供在线运行，使用Jsfiddle

* demo展示时，完善安装过程，hello world等

* 项目在构建的时候，能展示进度

* highlight.js中的样式引用不到的问题

* vue文件引用css源代码不能按postcss的解析，考虑配置问题

* eslint配置

<a name="相关文档链接"></a> 

## 相关文档链接

* [pyff-vue之vuex——pyff-vue开源项目使用技术详解（其一）](https://vuex.vuejs.org/zh-cn/)

* [pyff-vue之axios——pyff-vue开源项目使用技术详解（其二）](https://www.jianshu.com/p/df464b26ae58)

* [pyff-vue之vue-router——pyff-vue开源项目使用技术详解（其三）](https://router.vuejs.org/zh-cn/)

* [pyff-vue之echarts——pyff-vue开源项目使用技术详解（其四）](http://echarts.baidu.com/examples.html)

* [pyff-vue之font-awesome——pyff-vue开源项目使用技术详解（其五）](http://fontawesome.dashgame.com/)

* [pyff-vue之throttle-debounce——pyff-vue开源项目使用技术详解（其六）](https://www.jianshu.com/p/fb08b7ef31de)

* [pyff-vue之deepmerge——pyff-vue开源项目使用技术详解（其七）](http://npm.taobao.org/package/deepmerge)

<a name="主要维护者"></a> 

## 主要维护者
在使用中有任何问题，欢迎反馈给我们

* [hanweiqiang]()  

* [weiyong]()  

* [wangweiyi]()  

* [guangguangcheng]()  

* [liuqi]()  

* [zhangpeng]()

<a name="版权许可证"></a> 

## 版权许可证
[WTFPL](http://www.wtfpl.net/about/)&
[MIT](http://opensource.org/licenses/MIT)
