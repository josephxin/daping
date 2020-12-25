import axios from "@/util/axios";
import util from "@/util/util";
let servelURL = util.getServelURL()

/**
 * 获取字段类型下拉
 * @param params
 * @returns {AxiosPromise<T>}
 */
export let queryDataFormatList = () => {
    return axios.get(`${servelURL}code_table/column_type`);
};

/**
 * 获取数据集的操作类型
 * @param params
 * @returns {AxiosPromise<T>}
 */
export let queryDatasetOperationTypes = () => {
    return axios.get(`${servelURL}code_table/dataset_operation_types`);
};

/**
 * 获取数据源类型
 * @param params
 * @returns {AxiosPromise<T>}
 */
export let querySourceTypes = () => {
    return axios.get(`${servelURL}code_table/source_type`);
};

/**
 * 获取数据源
 * @param params
 * @returns {AxiosPromise<T>}
 */
export let queryDataSource = () => {
    return axios.get(`${servelURL}dataset/data_source`);
};

/**
 * 获取数据库表
 * @param params
 * @returns {AxiosPromise<T>}
 */
export let queryDataSourceTables = dataSourceId => {
    return axios.get(`${servelURL}dataset/${dataSourceId}/tables`);
};

/**
 * 获取某个分组下的表单集合(分页)
 */
export let queryDataSetList = params => {
    return axios.post(`${servelURL}dataset/page/_mget`, params);
};

/**
 * 根据项目版本id和数据集code删除数据集
 * @param {*} params
 */
export let delDataSetData = params => {
    return axios.delete(
        `${servelURL}dataset/${params.pjVId}/${params.dsCode}
    `);
};

/**
 * 根据项目版本id和数据集code集合批量删除数据集
 */
export let batchDelDataSetData = (params, pjVid) => {
    return axios.post(
        `${servelURL}dataset/${pjVid}/_mdelete`,
        params
    );
};

/**
 * 根据数据源和表获取表字段
 */
export let queryDataSetTableColumns = (dataSourceId, tableCode) => {
    return axios.post(
        `${servelURL}dataset/${dataSourceId}/${tableCode}/table_columns`
    );
};

/**
 * 解析sql
 */
export let queryAnalysisSqlTableColumns = (dataSourceId, params) => {
    return axios.get(
        `${servelURL}dataset/${dataSourceId}/analysis_sql`,
        {
            params: params
        }
    );
};

/**
 * 新增数据集
 */
export let addDataSet = params => {
    return axios.post(`${servelURL}dataset`, params);
};

/**
 * 修改数据集
 */
export let editDataSet = (params, id) => {
    return axios.put(`${servelURL}dataset/${id}`, params);
};

/**
 * 获取某个分组下的数据集集合(不分页)
 */
export let queryAllDataSet = (params, projectId) => {
    return axios.post(`${servelURL}dataset/_mget?projectId=${projectId}`, params);
};

/**
 * 修改数据集
 */
export let editMainAndSubset = params => {
    return axios.put(`${servelURL}main_and_subset`, params);
};

/**
 * 获取主子集绑定信息
 */
export let queryMainAndSubset = id => {
    return axios.post(`${servelURL}main_and_subset/${id}`);
};

/**
 * 获取数据集和明细数据
 */
export let queryDataSetDetail = id => {
    return axios.get(`${servelURL}dataset/${id}/dataset_detail`);
};

/**
 * 获取表格展示类型下拉
 */
export let queryBusType = id => {
    return axios.get(`${servelURL}code_table/column_bus_type`);
};

/**
 * 获取表格维度/指标下拉
 */
export let queryDefDire = id => {
    return axios.get(`${servelURL}code_table/column_def_dire`);
};
