const code = 'boxplot';
let datasetMeta = [{
        columnName: 'dimension1',
        columnDesc: '年',
        columnDefDire: 2
    },
    {
        columnName: 'indi1',
        columnDesc: '指标1',
        columnDefDire: 1
    },
    {
        columnName: 'indi2',
        columnDesc: '指标2',
        columnDefDire: 1
    },
    {
        columnName: 'indi3',
        columnDesc: '指标3',
        columnDefDire: 1
    },
    {
        columnName: 'indi4',
        columnDesc: '指标4',
        columnDefDire: 1
    },
    {
        columnName: 'indi5',
        columnDesc: '指标5',
        columnDefDire: 1
    }
]
let data = [{
        "dimension1": "2015",
        "indi1": 395.45,
        "indi2": 39.96,
        "indi3": 556.27,
        "indi4": 866.05,
        "indi5": 310.98
    },
    {
        "dimension1": "2016",
        "indi1": 365.23,
        "indi2": 961.87,
        "indi3": 678.09,
        "indi4": 31.79,
        "indi5": 435.44
    },
    {
        "dimension1": "2017",
        "indi1": 544.51,
        "indi2": 369.01,
        "indi3": 571.81,
        "indi4": 232.92,
        "indi5": 390.75
    },
    {
        "dimension1": "2018",
        "indi1": 890.7,
        "indi2": 748.05,
        "indi3": 726.96,
        "indi4": 397.87,
        "indi5": 649.19
    },
    {
        "dimension1": "2019",
        "indi1": 942.55,
        "indi2": 392.9,
        "indi3": 508.47,
        "indi4": 246.9,
        "indi5": 505.44
    },
    {
        "dimension1": "2020",
        "indi1": 606.07,
        "indi2": 399.47,
        "indi3": 84.86,
        "indi4": 829.23,
        "indi5": 204.64
    }
]
export default { code, data, datasetMeta }