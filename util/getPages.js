const glob = require('glob')
let pages = {}
module.exports.pages = () => {
    glob.sync('./src/module/*/*.js').forEach(filepath => {
        let fileList = filepath.split('/')
        let fileName = fileList[fileList.length - 2]
        pages[fileName] = {
            entry: `src/module/${fileName}/${fileName}.js`,
            // 模板来源
            template: `src/module/${fileName}/${fileName}.html`,
            // 在 dist/index.html 的输出
            fileName: `${fileName}.html`,
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', fileName]
        }
    })
    return pages
}