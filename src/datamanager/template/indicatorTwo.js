const code = 'indicatorTwo';

let data = [{
    id: 1,
    name: '地区生产总值',
    value: 198654,
    rate: 8,
    unit: '%'
}, {
    id: 2,
    name: '规模以上工业增加值',
    value: 198654,
    rate: 8,
    unit: '%'
}, {
    id: 3,
    name: '固定资产投资',
    value: 198654,
    rate: 8,
    unit: '%'
}, {
    id: 4,
    name: '社会消费品零售总额',
    value: 198654,
    rate: 8,
    unit: '%'
}, {
    id: 5,
    name: '出口总额',
    value: 198654,
    rate: 8,
    unit: '%'
}, {
    id: 6,
    name: '地方一般公共预算',
    value: 198654,
    rate: 8,
    unit: '%'
}];

let datasetMeta = [
    {
        columnName: 'id',
        columnDesc: '主键',
        columnDefDire: 1//1为指标；2为描述
    },
    {
        columnName: 'name',
        columnDesc: '指标名',
        columnDefDire: 1
    },
    {
        columnName: 'value',
        columnDesc: '指标值',
        columnDefDire: 1
    },
    {
        columnName: 'rate',
        columnDesc: '指标趋势',
        columnDefDire: 1
    },
    {
        columnName: 'unit',
        columnDesc: '单位',
        columnDefDire: 1
    },
    {
        columnName: 'icon',
        columnDesc: '图标',
        columnDefDire: 1
    }
];

export default { code, data, datasetMeta }
