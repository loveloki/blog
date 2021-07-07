const chokidar = require('chokidar')
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
}
