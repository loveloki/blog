# canvas编辑图片跨域

> canvas图片 getImageData,toDataURL 跨域问题
> canvas图片 js中加载 跨域问题

## 前提：后端配置Access-Control-Allow-Origin

**因为是跨域请求，所以后端需要配置。**

## getImageData,toDataURL 跨域问题

设置 **crossOrigin** 属性

```javascript
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

const img = new Image()
// 解决图像跨域问题, crossOrigin设置为 anonymous(空字符串效果相同)
img.crossOrigin = ''
img.src = this.src
img.onload = () => {
  const { width, height } = img
  canvas.width = width
  canvas.height = height
  context.drawImage(img, 0, 0)
  const base64 = canvas.toDataURL('image/jpeg', 1.0)
}
```

## canvas图片 js中加载 跨域问题

> 如果在 HTML 中加载了的图片是没有通过 CORS 请求（默认情况下），这时候再去通过 js 获取会产生跨域。

因为浏览器会缓存图片，js 再次请求会从缓存读取,但是 HTML 中加载的 img 没有通过 CORS 方式读取，所以现在通过 CORS 方式去请求非跨域的图片，会产生 CORS 错误。

### HTML中的图片加上 crossOrigin 属性

这样使得缓存的图片就是 CORS 方式的，所以 js 中用 CORS 方式去读取就不会产生问题了。

### 设置 Cache-Control: no-cache

或者其他办法，只要不走缓存，重新请求就好。

### 通过请求获取图片

获取到图片数据后，使用 `URL.createObjectURL` 把 `Blob` 转换为 `URL` 。

```javascript
fetch(this.src).then((res) => res.blob()).then((data) => {
  const img = new Image()
  img.src = URL.createObjectURL(data)
  document.querySelector('body').append(img)
})
```



## 参考链接

- [MDN img](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)
- [解决canvas图片getImageData,toDataURL跨域问题](https://www.zhangxinxu.com/wordpress/2018/02/crossorigin-canvas-getimagedata-cors/)
- [一个关于image访问图片跨域的问题](https://juejin.cn/post/6844903795726483463)
