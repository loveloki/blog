const chokidar = require('chokidar')
const { markDir, TIPS, getDate } = require('./utils')
const fs = require('fs')

//初始化目录
const buildPath = './build'
if (!fs.existsSync(buildPath)) {
  markDir(buildPath)
}

// 一篇文章需要有
// 内容
// 英文文件名
// 中文标题
// 简介
let isHaveMarkdownArticle = null
let name = null
let title = null
let description = null

// 首页的文章列表
const catalog = []

// 添加文件在 temp 文件夹
// 标题和简介配置在 cfg 文件中
// 文章直接放进来

// 监听 cfg 文件
chokidar
  .watch('./temp/index.cfg')
  .on('add', (path) => {
    dealWithCfgFile(path)
  })
  .on('change', (path) => {
    dealWithCfgFile(path)
  })

//监听 markdown 文件
chokidar
  .watch('./temp/index.md')
  .on('add', (path) => {
    dealWithMarkDownFile()
  })
  .on('change', (path) => {
    dealWithMarkDownFile()
  })

/**
 * 处理 cfg 文件变动
 **/
function dealWithCfgFile(path) {
  const content = fs.readFileSync(path, { encoding: 'utf8' })
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
  if (isHaveMarkdownArticle) {
    buildArticle()
  }
}
/**
 * 处理 md 文件变动
 **/
function dealWithMarkDownFile() {
  isHaveMarkdownArticle = true

  // 如果标题和简介不存在
  if (!title || !description || !name) {
    console.log(TIPS.INFO, '没有标题和简介，不能生成')
    return
  }

  buildArticle()
}

function buildArticle() {
  console.log(TIPS.INFO, '开始生成')

  const { year, month } = getDate()

  // 移动文章
  const movePath = `${buildPath}/article/${year}/${month}`
  console.log(TIPS.INFO, '路径为: ', movePath)

  if (!fs.existsSync(movePath)) {
    markDir(movePath)
  }

  // 移动文件
  fs.copyFileSync('./temp/index.md', `${movePath}/${name}.md`)

  // 生成首页目录
  const item = {
    title,
    name,
    description,
    year,
    month,
  }

  catalog.push(item)

  try {
    fs.writeFileSync('./build/catalog.json', JSON.stringify(catalog))

    console.log(TIPS.INFO, '新添加的文章为：', item)

    // 清除 temp 文件夹
    fs.readdirSync('./temp').forEach((path) => fs.rmSync(`./temp/${path}`, { recursive: true }))
    // 重置变量
    isHaveMarkdownArticle = null
    name = null
    title = null
    description = null

    console.log(TIPS.FINISH, '完成，清空临时文件夹')
  } catch (error) {
    console.log(TIPS.ERROR, error)
  }
}
