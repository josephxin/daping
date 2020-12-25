import util from '../util/util'
import store from "@/store/store"
// 查询所有数据源地址
const ALL_DATABASE_URL = util.appServerURL() + "datasource/sqldata/list";

// 添加数据源地址
const ADD_DATABASE_URL = util.appServerURL() + "datasource/sqldata/source";

// 查询数据源数据地址
const QUERY_DATABASE_URL = util.appServerURL() + "datasource/sqldata/list/";

async function loadDataSource() {
    let result = await store._actions.getSourceList[0]()
    return result
        // let result = null;
        // $.ajax({
        //     url: ALL_DATABASE_URL, // 数据源地址
        //     cache: false,
        //     async: false,
        //     success: function(data) {
        //         if (data) {
        //             result = data;
        //         }
        //     },
        //     error: function(request, errorMessage, errorObj) {
        //         console.error("加载database数据源列表出错:", request, errorMessage, errorObj);
        //     }
        // });
        // return result;
}

export { loadDataSource, QUERY_DATABASE_URL, ADD_DATABASE_URL, ALL_DATABASE_URL }