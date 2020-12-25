const code = 'bubble';
let datasetMeta = [{
        columnName: 'dimension1',
        columnDesc: '年',
        columnDefDire: 2
    }, {
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
    }
]
let data = [{
        "dimension1": 1990,
        "indi1": 28604,
        "indi2": 77,
        "indi3": 17096869
    },
    {
        "dimension1": 1990,
        "indi1": 31163,
        "indi2": 77.4,
        "indi3": 27662440
    },
    {
        "dimension1": 1990,
        "indi1": 1516,
        "indi2": 68,
        "indi3": 1154605773
    },
    {
        "dimension1": 1990,
        "indi1": 13670,
        "indi2": 74.7,
        "indi3": 10582082
    },
    {
        "dimension1": 1990,
        "indi1": 28599,
        "indi2": 75,
        "indi3": 4986705
    },
    {
        "dimension1": 1990,
        "indi1": 29476,
        "indi2": 77.1,
        "indi3": 56943299
    },
    {
        "dimension1": 1990,
        "indi1": 31476,
        "indi2": 75.4,
        "indi3": 78958237
    },
    {
        "dimension1": 1990,
        "indi1": 28666,
        "indi2": 78.1,
        "indi3": 254830
    },
    {
        "dimension1": 1990,
        "indi1": 1777,
        "indi2": 57.7,
        "indi3": 870601776
    },
    {
        "dimension1": 1990,
        "indi1": 29550,
        "indi2": 79.1,
        "indi3": 122249285
    },
    {
        "dimension1": 1990,
        "indi1": 2076,
        "indi2": 67.9,
        "indi3": 20194354
    },
    {
        "dimension1": 1990,
        "indi1": 12087,
        "indi2": 72,
        "indi3": 42972254
    },
    {
        "dimension1": 1990,
        "indi1": 24021,
        "indi2": 75.4,
        "indi3": 3397534
    },
    {
        "dimension1": 1990,
        "indi1": 43296,
        "indi2": 76.8,
        "indi3": 4240375
    },
    {
        "dimension1": 1990,
        "indi1": 10088,
        "indi2": 70.8,
        "indi3": 38195258
    },
    {
        "dimension1": 1990,
        "indi1": 19349,
        "indi2": 69.6,
        "indi3": 147568552
    },
    {
        "dimension1": 1990,
        "indi1": 10670,
        "indi2": 67.3,
        "indi3": 53994605
    },
    {
        "dimension1": 1990,
        "indi1": 26424,
        "indi2": 75.7,
        "indi3": 57110117
    },
    {
        "dimension1": 1990,
        "indi1": 37062,
        "indi2": 75.4,
        "indi3": 252847810
    },
    {
        "dimension1": 2015,
        "indi1": 44056,
        "indi2": 81.8,
        "indi3": 23968973
    },
    {
        "dimension1": 2015,
        "indi1": 43294,
        "indi2": 81.7,
        "indi3": 35939927
    },
    {
        "dimension1": 2015,
        "indi1": 13334,
        "indi2": 76.9,
        "indi3": 1376048943
    },
    {
        "dimension1": 2015,
        "indi1": 21291,
        "indi2": 78.5,
        "indi3": 11389562
    },
    {
        "dimension1": 2015,
        "indi1": 38923,
        "indi2": 80.8,
        "indi3": 5503457
    },
    {
        "dimension1": 2015,
        "indi1": 37599,
        "indi2": 81.9,
        "indi3": 64395345
    },
    {
        "dimension1": 2015,
        "indi1": 44053,
        "indi2": 81.1,
        "indi3": 80688545
    },
    {
        "dimension1": 2015,
        "indi1": 42182,
        "indi2": 82.8,
        "indi3": 329425
    },
    {
        "dimension1": 2015,
        "indi1": 5903,
        "indi2": 66.8,
        "indi3": 1311050527
    },
    {
        "dimension1": 2015,
        "indi1": 36162,
        "indi2": 83.5,
        "indi3": 126573481
    },
    {
        "dimension1": 2015,
        "indi1": 1390,
        "indi2": 71.4,
        "indi3": 25155317
    },
    {
        "dimension1": 2015,
        "indi1": 34644,
        "indi2": 80.7,
        "indi3": 50293439
    },
    {
        "dimension1": 2015,
        "indi1": 34186,
        "indi2": 80.6,
        "indi3": 4528526
    },
    {
        "dimension1": 2015,
        "indi1": 64304,
        "indi2": 81.6,
        "indi3": 5210967
    },
    {
        "dimension1": 2015,
        "indi1": 24787,
        "indi2": 77.3,
        "indi3": 38611794
    },
    {
        "dimension1": 2015,
        "indi1": 23038,
        "indi2": 73.13,
        "indi3": 143456918
    },
    {
        "dimension1": 2015,
        "indi1": 19360,
        "indi2": 76.5,
        "indi3": 78665830
    },
    {
        "dimension1": 2015,
        "indi1": 38225,
        "indi2": 81.4,
        "indi3": 64715810
    },
    {
        "dimension1": 2015,
        "indi1": 53354,
        "indi2": 79.1,
        "indi3": 321773631
    }
]
export default { code, data, datasetMeta }