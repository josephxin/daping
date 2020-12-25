import io from "@/util/io"

const api = {
    async lists(url) {
        return new Promise((resolve, reject) => {
            io.get(url).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    async update(url, data) {
        return new Promise((resolve, reject) => {
            io.put(url, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    async create(url, data) {
        return new Promise((resolve, reject) => {
            io.post(url, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    async detail(url) {
        return new Promise((resolve, reject) => {
            io.get(url).then(res => {
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
