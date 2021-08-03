# 博客搭建步骤

## 目标

快速，静态，不需要数据库。

## 技术栈

`React` + `Node.js` 

## 设计

> // 后台监控文件变动，当文章和配置文件都出现的时候，去生成新的文章目录并且把文章复制到指定目录下。
>
> // 灵感来源于 `lunr` ，将数据写入文件，每次更新文章更新文件。前端读取文件来展示。

### 博客首页

#### 首页分页列表

- 前端维护分页：读取 `/catalog.json`进行分页
- `markdown` 解析使用 [`react-markdown`](https://github.com/remarkjs/react-markdown)



