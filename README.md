# FormMobile

## 快速上手
```
基于mue框架，使用前需提前引入mue
```

## 安装
```
cnpm i git+https://hub.hddznet.com/uniplatform/FormMobile.git --save
```

## 引入
```
import Vue from "vue";
import Mue from "mue/src/index";
import FormMobile from "FormMobile/src/index"

Vue.use(Mue);
Vue.use(FormMobile);

import "mue/themes/index.less";
```

## 特殊修改
vue.config.js
添加了jQuery、Moment插件
```
plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        moment: "moment"
    })
],
```

## 版本
查看方法
```
window.FORMMOBILE_VERSION
```
