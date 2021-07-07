const chokidar = require('chokidar')
const { markDir, TIPS, getDate } = require('./utils')
const fs = require('fs')

// 一篇文章需要有
// 内容
// 英文文件名
// 中文标题
// 简介
let markdownArticle = null
let name = null
let title = null
let description = null

// 首页的文章列表
const pageCatalog = []

// 添加文件在 temp 文件夹
// 标题和简介配置在 cfg 文件中
// 文章直接放进来
chokidar
  .watch('./temp', { ignored: /(.*)\.(?!(md|cfg))/ })
  .on('add', (path) => {
    dealWithTempFile(path)
  })
  .on('change', (path) => {
    dealWithTempFile(path)
  })

/**
 * 处理 temp 文件夹文件变动
 **/
function dealWithTempFile(path) {
  const content = fs.readFileSync(path, { encoding: 'utf8' })

  // 如果是配置文件，读取
  if (path.split('.')[1] === 'cfg') {
    let cfg

    try {
      cfg = JSON.parse(content)
    } catch (error) {}

    if (!cfg || !cfg.title || !cfg.description || !cfg.name) {
      return
    }

    // 读取标题和简介
    title = cfg.title
    name = cfg.name
    description = cfg.description

    // 存在文章则去生成
    if (markdownArticle) {
      buildArticle()
    }
  } else {
    // 否则是文章
    // 如果标题和简介不存在
    if (!title || !description) {
      console.log('没有标题和简介，不能生成')
      return
    }

    buildArticle()
  }
}

function buildArticle() {
}
