const code = 'DataSetOneDimensionRecordOne';
let datasetMeta = [{
        columnName: 'year',
        columnDesc: '年',
        columnDefDire: 2
    },
    {
        columnName: 'gangtie',
        columnDesc: '钢铁',
        columnDefDire: 1
    },
    {
        columnName: 'meitan',
        columnDesc: '煤炭',
        columnDefDire: 1
    },
    {
        columnName: 'shiyou',
        columnDesc: '石油',
        columnDefDire: 1
    },
    {
        columnName: 'tianranqi',
        columnDesc: '天然气',
        columnDefDire: 1
    }
]
let data = [{
    year: '2020',
    'meitan': 121.1,
    'gangtie': 30.4,
    'shiyou': 115.1,
    'tianranqi': 33.3
}]
export default { code, data, datasetMeta }