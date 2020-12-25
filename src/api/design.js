import io from "@/util/io"

const api = {
    // 编辑时 获取组件配置详情
    async getEditDetail(url) {
        return new Promise((resolve, reject) => {
            io.get(url).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // 保存设计
    async saveDesign(url, data) {
        return new Promise((resolve, reject) => {
            io.post(url, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
export default api
