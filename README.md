# SimpleList [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/YunyChan/SimpleList/blob/master/LICENSE) #

一个不依赖任何第三方框架库的支持无限上拉加载的列表组件

## 快速开始 ##

+ 直接从上面下载
+ 克隆项目：https://github.com/YunyChan/SimpleList.git

## 使用 ##

首先在页面中引入`SimpleList.js`JS文件

```html
<script src="SimpleList.js"></script>
```

然后通过创建SimpleList的实例并传入相应的参数来插入并使用组件

```html
<div id="list"></div>
<script src="SimpleList.js"></script>
<script>
    var oData = [
        {
            name: 'test1',
            age: 15
        },
        {
            name: 'test2',
            age: 20
        },
        {
            name: 'test3',
            age: 25
        },
        {
            name: 'test4',
            age: 30
        },
        {
            name: 'test5',
            age: 35
        }
    ];
    var oList = new SimpleList({
        target: document.getElementById('list'),
        data: oData,
        item: function(nIndex, oData){
            return 'Name：' + oData.name + ' & Age:' + oData.age + '.';
        },
        // 无限加载
        isEndless: true,
        onReachBottom: function () {
            // todo something, e.g:
            this.update(oData);
        }
    });
</script>
```

下面是组件的配置参数说明：

+ `target` - __必须__, 需要插入列表组件的dom元素
+ `data` - __必须__, 数据源，数组形式
+ `item` - _必须_, 列表每项的模板
+ `isEndless` - _default: false_, 是否使用无限上拉加载功能
+ `onReachBottom` - _default: null_, 列表到达底部时执行的回调方法
+ `isShowLoading` - _default: false_, 是否显示底部“正在加载”提示，只有开启无限上拉加载功能的时候才有效
+ `loading` - _default: `<p>正在加载中，请稍后</p>`_, 底部“正在加载”提示内容模板

## 作者 ##

Yuny Chan

+ [GitHub：https://github.com/YunyChan](https://github.com/YunyChan)
+ [博客：http://yuny.me/](http://yuny.me/)