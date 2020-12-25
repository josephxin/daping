import util from '../util/util'

// 查询所有数据源地址
const ALL_EXCEL_URL = util.appServerURL() + 'datasource/list/1' // 1：excel; 2:csv, 3: api， 4为其他

// 添加数据源地址
const ADD_EXCEL_URL = util.appServerURL() + 'datasource/upload/excelfile'

// 查询数据源数据地址
const QUERY_EXCEL_URL = util.appServerURL() + 'datasource/datalist/'

// 查询数据源数据地址(sql)
const QUERY_EXCELSQL_URL = util.appServerURL() + 'store/select/sql'

// 查询数据源的所有列的地址
const QUERY_EXCEL_ALL_COLUMN_URL = util.appServerURL() + 'datasource/fieldlist/'

// 查询数据源状态
const QUERY_EXCEL_STATE = util.appServerURL() + 'datasource/file/{id}/status'

function loadDataSource() {
    let result = null

    return result
}

function loadColumnByDataSource(dataSourceId) {
    let result = null
    if (!dataSourceId) {
        return result
    }
    return result
}

export { loadDataSource, loadColumnByDataSource, QUERY_EXCEL_URL, QUERY_EXCELSQL_URL, ADD_EXCEL_URL, ALL_EXCEL_URL, QUERY_EXCEL_STATE }
