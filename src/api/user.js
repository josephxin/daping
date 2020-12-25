import io from "@/util/io"

const api = {
    async login(url, params) {
        return new Promise((resolve, reject) => {
            io.post(url, params).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
export default api
