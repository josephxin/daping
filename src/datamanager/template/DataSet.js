const code = 'DataSet';
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
        year: '2015',
        'meitan': 41.1,
        'gangtie': 30.4,
        'shiyou': 65.1,
        'tianranqi': 53.3
    },
    {
        year: '2016',
        'meitan': 51.1,
        'gangtie': 20.4,
        'shiyou': 65.1,
        'tianranqi': 33.3
    },
    {
        year: '2017',
        'meitan': 91.1,
        'gangtie': 10.4,
        'shiyou': 100.1,
        'tianranqi': 13.3
    },
    {
        year: '2018',
        'meitan': 22.1,
        'gangtie': 32.4,
        'shiyou': 332.1,
        'tianranqi': 21.3
    },
    {
        year: '2019',
        'meitan': 41.1,
        'gangtie': 80.4,
        'shiyou': 60.1,
        'tianranqi': 23.3
    },
    {
        year: '2020',
        'meitan': 121.1,
        'gangtie': 30.4,
        'shiyou': 115.1,
        'tianranqi': 33.3
    }
]
export default { code, data, datasetMeta }