const dayjs = require('dayjs')
const fs = require('fs')
require('colors')

/**
 * 获取当前日期数据
 * @returns 返回当前的 { year, month }
 **/
function getDate() {
  const todayArray = dayjs().format('YYYY-MM-DD').split('-')

  const year = todayArray[0]
  const month = todayArray[1]

  return { year, month }
}

/**
 * 根据路径创建新的目录
 * @param {string} path 想要创建的目录
 **/
function markDir(path) {
  const index = path.lastIndexOf('/')
  if (index !== -1) {
    const parentPath = path.slice(0, index)

    // console.log('parent', parentPath, path)

    if (!fs.existsSync(parentPath)) {
      markDir(parentPath)
    }
  }
  fs.mkdirSync(path)
}

/**
 * 提示文字类型
 * @returns 四种类型 ['SUCCESS', 'INFO', 'ERROR', 'FINISH']
 **/
const TIPS = {
  SUCCESS: '✅ [成功]'.green,
  INFO: '💡 [提示]'.blue,
  ERROR: '❌ [错误]'.red,
  FINISH: '💯 [完成]'.green,
}

module.exports = {
  getDate,
  markDir,
  TIPS,
}
