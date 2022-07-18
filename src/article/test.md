# test.md

**目录 (Table of Contents)**

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

# Heading 1 link [Heading link](http://placekitten.com/)

## Heading 2 link [Heading link](http://placekitten.com/)

### Heading 3 link [Heading link](http://placekitten.com/)

#### Heading 4 link [Heading link](http://placekitten.com/)

##### Heading 5 link [Heading link](http://placekitten.com/)

###### Heading 6 link [Heading link](http://placekitten.com/)

#### 标题（用底线的形式）Heading (underline)

# This is an H1

## This is an H2

### 字符效果和横线等

---

~~删除线~~ <s>删除线（开启识别 HTML 标签时）</s>
_斜体字_ _斜体字_
**粗体** **粗体**
**_粗斜体_** **_粗斜体_**

### 引用 Blockquotes

> 引用文本 Blockquotes

引用的行内混合 Blockquotes

> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，[普通链接](http://localhost/)。

### 锚点与链接 Links

[普通链接](http://localhost/)

[普通链接带标题](http://localhost/ '普通链接带标题')

[锚点链接][anchor-id]

[anchor-id]: http://placekitten.com/

[mailto:test.test@gmail.com](mailto:test.test@gmail.com)

### 多语言代码高亮 Codes

#### JS 代码　

```javascript
function test() {
  console.log('Hello world!')
}

;(function () {
  var box = function () {
    return box.fn.init()
  }

  box.prototype = box.fn = {
    init: function () {
      console.log('box.init()')

      return this
    },

    add: function (str) {
      alert('add', str)

      return this
    },

    remove: function (str) {
      alert('remove', str)

      return this
    },
  }

  box.fn.init.prototype = box.fn

  window.box = box
})()

var testBox = box()
testBox.add('jQuery').remove('jQuery')
```

### 图片 Images

Image:

![11](http://placekitten.com/g/200/300)

---

### 列表 Lists

#### 无序列表（减号）Unordered Lists (-)

- 列表一
- 列表二
- 列表三

#### 无序列表（星号）Unordered Lists (\*)

- 列表一
- 列表二
- 列表三

#### 无序列表（加号和嵌套）Unordered Lists (+)

- 列表一
- 列表二
  - 列表二-1
  - 列表二-2
  - 列表二-3
- 列表三
  - 列表一
  - 列表二
  - 列表三

#### 有序列表 Ordered Lists (-)

1. 第一行
2. 第二行
3. 第三行

#### 反斜杠 Escape

\*literal asterisks\*

[========]

### End
