const code = 'indicatorOne';

let data = [{
    id: 1,
    name: '病种数',
    value: 23,
    unit: '种',
    icon: '',
    mark: ''
}, {
    id: 2,
    name: '新疫点数',
    value: 552,
    unit: '个',
    icon: '',
    mark: ''
}, {
    id: 3,
    name: '县数',
    value: 570,
    unit: '个',
    icon: '',
    mark: ''
}, {
    id: 4,
    name: '疫点易感动物存栏量',
    value: 2653492,
    unit: '羽',
    icon: '',
    mark: ''
}, {
    id: 5,
    name: '县次数',
    value: 764,
    unit: '个',
    icon: '',
    mark: ''
}, {
    id: 6,
    name: '扑杀/销毁数',
    value: 11752,
    unit: '羽',
    icon: '',
    mark: ''
}, {
    id: 7,
    name: '发病数',
    value: 121912,
    unit: '羽',
    icon: '',
    mark: ''
}, {
    id: 8,
    name: '发病率',
    value: 4.59,
    unit: '%',
    icon: '',
    mark: ''
}, {
    id: 9,
    name: '病死数',
    value: 14740,
    unit: '羽',
    icon: '',
    mark: ''
}, {
    id: 10,
    name: '病死率',
    value: 12.10,
    unit: '%',
    icon: '',
    mark: ''
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
