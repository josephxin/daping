var fs = require('fs')
const path = require('path')

/**
 * 复制文件夹
 * @param {*} src 
 * @param {*} dest 
 */
function copyDirectory(src, dest) {
    if (!fs.existsSync(src)) fs.mkdirSync(src)
    if (!fs.existsSync(dest)) fs.mkdirSync(dest)
    let dirs = fs.readdirSync(src)
    dirs.forEach(function(item) {
        var filePath = path.join(src, item)
        let temp = fs.statSync(filePath)
        if (temp.isFile()) { // 是文件
            fs.copyFileSync(filePath, path.join(dest, item));
        } else if (temp.isDirectory()) { // 是目录
            copyDirectory(filePath, path.join(dest, item))
        }
    })
}
/**
 * 删除文件夹
 * @param {*} dir 
 */
function deleteDirectory(dir) {
    if (fs.existsSync(dir)) {
        let files = fs.readdirSync(dir)
        files.forEach(item => {
            let filePath = path.join(dir, item)
            if (fs.statSync(filePath).isDirectory()) {
                deleteDirectory(filePath)
            } else {
                fs.unlinkSync(filePath)
            }
        })
        fs.rmdirSync(dir)
    }
}
// 创建static 文件夹
const staticPath = "./dist/static"
if (!fs.existsSync(staticPath)) {
    fs.mkdirSync(staticPath)
}
let directorys = ['js', 'css', 'img', 'fonts'] //需要拷贝的文件夹
directorys.forEach(item => {
    copyDirectory(`./dist/${item}`, `${staticPath}/${item}`) //拷贝文件夹
    deleteDirectory(`./dist/${item}`) //删除文件夹
})
copyDirectory("./static", staticPath) //拷贝静态文件夹
    // copyDirectory("./mock", './dist') //拷贝mock文件夹下的excel和json等文件