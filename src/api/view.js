import io from "@/util/io"

const api = {
    async lists(url, params) {
        return new Promise((resolve, reject) => {
            io.get(url, params).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    async delete(url) {
        return new Promise((resolve, reject) => {
            io.delete(url).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
export default api
