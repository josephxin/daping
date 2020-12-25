const code = 'DataSetOnlyIndicator'
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
    '煤炭': 41.1,
    '钢铁': 30.4,
    '石油': 65.1,
    '天然气': 53.3
}]

export default { code, data, datasetMeta }