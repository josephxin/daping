const code = 'dataSetSimpleOneDimensions';
let datasetMeta = [{
        columnName: 'year',
        columnDesc: '年',
        columnDefDire: 2
    },
    {
        columnName: 'gangtie',
        columnDesc: '钢铁',
        columnDefDire: 1
    }
]
let data = [{
        year: '2015',
        'gangtie': 30.4,
    },
    {
        year: '2016',
        'gangtie': 20.4,
    },
    {
        year: '2017',
        'gangtie': 10.4,
    },
    {
        year: '2018',
        'gangtie': 32.4,
    },
    {
        year: '2019',
        'gangtie': 80.4,
    },
    {
        year: '2020',
        'gangtie': 30.4,
    }
]
export default { code, data, datasetMeta }