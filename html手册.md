# HTML部分
```html
所有组件共有部分：
id=""     唯一的id
class=""  分组
name=""   名称

<!DOCTYPE html>
<html>

</html>

<head> 标题设置、页面自动缩放等 </head>
<title></title> 页面标题

<body> 主体部分 </body>
```

## 四级标题
```html
<h1></h1>
<h2></h2>
<h3></h3>
<h4></h4>
```

## 文本内容
```html
<p></p>

<br> 换行
<strong></strong> 对某部分加粗
```

## 链接
```html
<a></a> 
href=""         链接的地址/网址
```

## 输入框
```html
<input> 
type=""         输入框类型
placeholder=""  提示文字
value=""        默认值，也作为输入框的内容
name=""         该输入框组件名字

required        必填项
```
## 按钮
```html
<button></button> 
```
## js脚本
```html
<script></script> 
src=""          js文件地址
```

## css关联链接
```html
<link rel="stylesheet" href="style.css">
```

# js部分

```js
//页面为DOM，有关页面的“对象”为: document
```

## 查询组件的办法

```js
document.getElementById("id")
//输入id, 返回单个组件

document.getElementsByClassName("classname")
//输入class名，返回所有拥有该class名的组件列表

document.getElementsByName("name")
//输入name名，返回所有拥有该name名的组件列表

document.querySelector("css选择器语法")
document.querySelectorAll("css选择器语法")
//用css选择器查询
// css选择器：
/*
    #id              用id筛选
    .classname       用class名筛选
    tag              用tag（标签名）筛选

    例如
    p.message        筛选标签名为p，class名为message的组件
    p.message.sport  筛选标签名为p, 同时满足两个class名的组件

*/
```

## 组件的事件监听
```js
// 假设element是一个组件
element.addEventListener("事件名称", function () {"触发后的行为"})

// 常见的事件有：
/*
    click        点击html标签
    submit       表单提交（写在<form></form>里面）
                 可监测：输入框中按回车/按钮按下
*/
```

## js异步循环执行
```js
// 重复执行：等待delay_time秒，执行函数
setInterval(function, delay_time)

```

# css部分
```js
// css选择器 + 内容

p.classname {
    text-align: center;
}

// 常见属性：
/*
    文本对齐方式
    text-align:  center/left/right/justified


*/