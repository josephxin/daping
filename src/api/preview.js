import io from "@/util/io"

const api = {
    async loadPreviewData(url) {
        return new Promise((resolve, reject) => {
            io.get(url).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
export default api
