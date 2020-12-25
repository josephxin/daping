import io from "@/util/io"
import http from "@/util/http"
import util from "@/util/util"
let servelURL = util.getServelURL()
const api = {
    //项目信息查询
    async getProjectList(params) {
        return new Promise((resolve, reject) => {
            io.get(`${servelURL}project/project/page?pageNum=${params.pageNum}&pageSize=${params.pageSize}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //项目信息保存
    async addProject(data) {
        return new Promise((resolve, reject) => {
            http.post(`${servelURL}project/project`, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //项目信息更新
    async updateProject(data, id) {
        return new Promise((resolve, reject) => {
            http.put(`${servelURL}project/project/${id}`, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //项目信息删除
    async deleteProject(id) {
        return new Promise((resolve, reject) => {
            io.delete(`${servelURL}project/project/${id}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    //通过项目ID获取导航信息
    async getNavByProjectId(id) {
        return new Promise((resolve, reject) => {
            io.get(`${servelURL}navigation/navigation_project?projectId=${id}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //保存或修改导航信息
    async saveNav(data) {
        return new Promise((resolve, reject) => {
            http.post(`${servelURL}navigation/save_update`, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    
    //分页获取视图列表
    async getPageList(params) {
        return new Promise((resolve, reject) => {
            io.get(`${servelURL}confStore/data_visual/page?projectId=${params.projectId}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //通过可视化页面ID，删除可视化页面数据
    async deletePageById(pid) {
        return new Promise((resolve, reject) => {
            io.delete(`${servelURL}confStore/data_visual/${pid}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //获取数据可视化信息
    async getPageDetail(pid) {
        return new Promise((resolve, reject) => {
            io.get(`${servelURL}confStore/data_visual/${pid}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //保存可视化页面
    async savePage(data) {
        return new Promise((resolve, reject) => {
            http.post(`${servelURL}confStore/data_visual`, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //更新可视化页面
    async updatePage(pid, data) {
        return new Promise((resolve, reject) => {
            http.put(`${servelURL}confStore/data_visual/${pid}`, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //另存可视化页面
    async saveAsPage(targetProjectId, data) {
        return new Promise((resolve, reject) => {
            http.post(`${servelURL}confStore/data_visual/${targetProjectId}`, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /* ------------数据集相关------------ */
    //获取数据集数据
    async datasetData(params, projectId) {
        return new Promise((resolve, reject) => {
            http.post(`${util.disapiURL()}dis_runtime_app/dis/${projectId}/data/_query`, params).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //分页查询数据集列表
    async getDataSetList(params) {
        return new Promise((resolve, reject) => {
            io.get(`${servelURL}data_set_reg/page/?projectId=${params.projectId}&name=${params.name}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //删除数据集注册
    async deleteDataSet(id) {
        return new Promise((resolve, reject) => {
            io.delete(`${servelURL}data_set_reg/${id}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //批量删除数据集注册
    async batchDeleteDataSet(idList) {
        return new Promise((resolve, reject) => {
            io.delete(`${servelURL}data_set_reg/_mdelete?idList=${idList}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //通过ID，获取数据集注册信息
    async getDataSetDetail(id) {
        return new Promise((resolve, reject) => {
            io.get(`${servelURL}data_set_reg/${id}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //保存数据集注册
    async saveDataSet(projectId, data) {
        return new Promise((resolve, reject) => {
            http.post(`${servelURL}data_set_reg?projectId=${projectId}`, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    //更新数据集注册
    async updateDataSet(id, data) {
        return new Promise((resolve, reject) => {
            http.put(`${servelURL}data_set_reg/${id}`, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
}
export default api
