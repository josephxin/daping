const code = 'towDimensionAndIndis';
let datasetMeta = [{
        columnName: 'xk',
        columnDesc: 'x轴维度key',
        columnDefDire: 2
    },
    {
        columnName: 'yk',
        columnDesc: 'y轴维度key',
        columnDefDire: 2
    },
    {
        columnName: 'value',
        columnDesc: '值',
        columnDefDire: 1
    },
    {
        columnName: 'value2',
        columnDesc: '附带值',
        columnDefDire: 1
    },
]
let data = [{
        "xk": "1a",
        "yk": "Saturday",
        "value": 8,
        "value2": 530
    },
    {
        "xk": "1a",
        "yk": "Friday",
        "value": 8,
        "value2": 578
    },
    {
        "xk": "1a",
        "yk": "Thursday",
        "value": 0,
        "value2": 288
    },
    {
        "xk": "1a",
        "yk": "Wednesday",
        "value": 5,
        "value2": 743
    },
    {
        "xk": "1a",
        "yk": "Tuesday",
        "value": 2,
        "value2": 291
    },
    {
        "xk": "1a",
        "yk": "Monday",
        "value": 0,
        "value2": 341
    },
    {
        "xk": "1a",
        "yk": "Sunday",
        "value": 2,
        "value2": 62
    },
    {
        "xk": "2a",
        "yk": "Saturday",
        "value": 5,
        "value2": 267
    },
    {
        "xk": "2a",
        "yk": "Friday",
        "value": 1,
        "value2": 17
    },
    {
        "xk": "2a",
        "yk": "Thursday",
        "value": 8,
        "value2": 138
    },
    {
        "xk": "2a",
        "yk": "Wednesday",
        "value": 3,
        "value2": 203
    },
    {
        "xk": "2a",
        "yk": "Tuesday",
        "value": 7,
        "value2": 273
    },
    {
        "xk": "2a",
        "yk": "Monday",
        "value": 9,
        "value2": 670
    },
    {
        "xk": "2a",
        "yk": "Sunday",
        "value": 9,
        "value2": 276
    },
    {
        "xk": "3a",
        "yk": "Saturday",
        "value": 9,
        "value2": 168
    },
    {
        "xk": "3a",
        "yk": "Friday",
        "value": 6,
        "value2": 542
    },
    {
        "xk": "3a",
        "yk": "Thursday",
        "value": 2,
        "value2": 98
    },
    {
        "xk": "3a",
        "yk": "Wednesday",
        "value": 3,
        "value2": 576
    },
    {
        "xk": "3a",
        "yk": "Tuesday",
        "value": 3,
        "value2": 757
    },
    {
        "xk": "3a",
        "yk": "Monday",
        "value": 6,
        "value2": 960
    },
    {
        "xk": "3a",
        "yk": "Sunday",
        "value": 3,
        "value2": 780
    },
    {
        "xk": "4a",
        "yk": "Saturday",
        "value": 2,
        "value2": 975
    },
    {
        "xk": "4a",
        "yk": "Friday",
        "value": 2,
        "value2": 762
    },
    {
        "xk": "4a",
        "yk": "Thursday",
        "value": 9,
        "value2": 449
    },
    {
        "xk": "4a",
        "yk": "Wednesday",
        "value": 9,
        "value2": 874
    },
    {
        "xk": "4a",
        "yk": "Tuesday",
        "value": 1,
        "value2": 104
    },
    {
        "xk": "4a",
        "yk": "Monday",
        "value": 3,
        "value2": 657
    },
    {
        "xk": "4a",
        "yk": "Sunday",
        "value": 0,
        "value2": 741
    },
    {
        "xk": "5a",
        "yk": "Saturday",
        "value": 4,
        "value2": 491
    },
    {
        "xk": "5a",
        "yk": "Friday",
        "value": 1,
        "value2": 518
    },
    {
        "xk": "5a",
        "yk": "Thursday",
        "value": 6,
        "value2": 913
    },
    {
        "xk": "5a",
        "yk": "Wednesday",
        "value": 2,
        "value2": 649
    },
    {
        "xk": "5a",
        "yk": "Tuesday",
        "value": 2,
        "value2": 67
    },
    {
        "xk": "5a",
        "yk": "Monday",
        "value": 3,
        "value2": 135
    },
    {
        "xk": "5a",
        "yk": "Sunday",
        "value": 9,
        "value2": 814
    },
    {
        "xk": "6a",
        "yk": "Saturday",
        "value": 3,
        "value2": 738
    },
    {
        "xk": "6a",
        "yk": "Friday",
        "value": 4,
        "value2": 408
    },
    {
        "xk": "6a",
        "yk": "Thursday",
        "value": 5,
        "value2": 492
    },
    {
        "xk": "6a",
        "yk": "Wednesday",
        "value": 1,
        "value2": 597
    },
    {
        "xk": "6a",
        "yk": "Tuesday",
        "value": 7,
        "value2": 555
    },
    {
        "xk": "6a",
        "yk": "Monday",
        "value": 5,
        "value2": 382
    },
    {
        "xk": "6a",
        "yk": "Sunday",
        "value": 4,
        "value2": 374
    },
    {
        "xk": "7a",
        "yk": "Saturday",
        "value": 6,
        "value2": 447
    },
    {
        "xk": "7a",
        "yk": "Friday",
        "value": 9,
        "value2": 715
    },
    {
        "xk": "7a",
        "yk": "Thursday",
        "value": 2,
        "value2": 393
    },
    {
        "xk": "7a",
        "yk": "Wednesday",
        "value": 4,
        "value2": 203
    },
    {
        "xk": "7a",
        "yk": "Tuesday",
        "value": 1,
        "value2": 144
    },
    {
        "xk": "7a",
        "yk": "Monday",
        "value": 7,
        "value2": 892
    },
    {
        "xk": "7a",
        "yk": "Sunday",
        "value": 2,
        "value2": 920
    },
    {
        "xk": "8a",
        "yk": "Saturday",
        "value": 2,
        "value2": 894
    },
    {
        "xk": "8a",
        "yk": "Friday",
        "value": 0,
        "value2": 182
    },
    {
        "xk": "8a",
        "yk": "Thursday",
        "value": 6,
        "value2": 324
    },
    {
        "xk": "8a",
        "yk": "Wednesday",
        "value": 7,
        "value2": 472
    },
    {
        "xk": "8a",
        "yk": "Tuesday",
        "value": 3,
        "value2": 593
    },
    {
        "xk": "8a",
        "yk": "Monday",
        "value": 6,
        "value2": 849
    },
    {
        "xk": "8a",
        "yk": "Sunday",
        "value": 8,
        "value2": 338
    },
    {
        "xk": "9a",
        "yk": "Saturday",
        "value": 3,
        "value2": 556
    },
    {
        "xk": "9a",
        "yk": "Friday",
        "value": 2,
        "value2": 432
    },
    {
        "xk": "9a",
        "yk": "Thursday",
        "value": 4,
        "value2": 767
    },
    {
        "xk": "9a",
        "yk": "Wednesday",
        "value": 5,
        "value2": 305
    },
    {
        "xk": "9a",
        "yk": "Tuesday",
        "value": 4,
        "value2": 784
    },
    {
        "xk": "9a",
        "yk": "Monday",
        "value": 3,
        "value2": 14
    },
    {
        "xk": "9a",
        "yk": "Sunday",
        "value": 8,
        "value2": 845
    },
    {
        "xk": "10a",
        "yk": "Saturday",
        "value": 3,
        "value2": 742
    },
    {
        "xk": "10a",
        "yk": "Friday",
        "value": 8,
        "value2": 659
    },
    {
        "xk": "10a",
        "yk": "Thursday",
        "value": 1,
        "value2": 124
    },
    {
        "xk": "10a",
        "yk": "Wednesday",
        "value": 9,
        "value2": 901
    },
    {
        "xk": "10a",
        "yk": "Tuesday",
        "value": 4,
        "value2": 253
    },
    {
        "xk": "10a",
        "yk": "Monday",
        "value": 4,
        "value2": 263
    },
    {
        "xk": "10a",
        "yk": "Sunday",
        "value": 5,
        "value2": 829
    },
    {
        "xk": "11a",
        "yk": "Saturday",
        "value": 7,
        "value2": 1006
    },
    {
        "xk": "11a",
        "yk": "Friday",
        "value": 2,
        "value2": 759
    },
    {
        "xk": "11a",
        "yk": "Thursday",
        "value": 3,
        "value2": 840
    },
    {
        "xk": "11a",
        "yk": "Wednesday",
        "value": 7,
        "value2": 479
    },
    {
        "xk": "11a",
        "yk": "Tuesday",
        "value": 9,
        "value2": 234
    },
    {
        "xk": "11a",
        "yk": "Monday",
        "value": 1,
        "value2": 756
    },
    {
        "xk": "11a",
        "yk": "Sunday",
        "value": 3,
        "value2": 793
    },
    {
        "xk": "12a",
        "yk": "Saturday",
        "value": 2,
        "value2": 439
    },
    {
        "xk": "12a",
        "yk": "Friday",
        "value": 4,
        "value2": 31
    },
    {
        "xk": "12a",
        "yk": "Thursday",
        "value": 1,
        "value2": 193
    },
    {
        "xk": "12a",
        "yk": "Wednesday",
        "value": 9,
        "value2": 1004
    },
    {
        "xk": "12a",
        "yk": "Tuesday",
        "value": 6,
        "value2": 112
    },
    {
        "xk": "12a",
        "yk": "Monday",
        "value": 3,
        "value2": 149
    },
    {
        "xk": "12a",
        "yk": "Sunday",
        "value": 7,
        "value2": 325
    },
    {
        "xk": "1p",
        "yk": "Saturday",
        "value": 0,
        "value2": 52
    },
    {
        "xk": "1p",
        "yk": "Friday",
        "value": 6,
        "value2": 193
    },
    {
        "xk": "1p",
        "yk": "Thursday",
        "value": 5,
        "value2": 244
    },
    {
        "xk": "1p",
        "yk": "Wednesday",
        "value": 3,
        "value2": 355
    },
    {
        "xk": "1p",
        "yk": "Tuesday",
        "value": 5,
        "value2": 80
    },
    {
        "xk": "1p",
        "yk": "Monday",
        "value": 6,
        "value2": 411
    },
    {
        "xk": "1p",
        "yk": "Sunday",
        "value": 7,
        "value2": 120
    },
    {
        "xk": "2p",
        "yk": "Saturday",
        "value": 2,
        "value2": 461
    },
    {
        "xk": "2p",
        "yk": "Friday",
        "value": 6,
        "value2": 755
    },
    {
        "xk": "2p",
        "yk": "Thursday",
        "value": 9,
        "value2": 430
    },
    {
        "xk": "2p",
        "yk": "Wednesday",
        "value": 3,
        "value2": 956
    },
    {
        "xk": "2p",
        "yk": "Tuesday",
        "value": 5,
        "value2": 715
    },
    {
        "xk": "2p",
        "yk": "Monday",
        "value": 4,
        "value2": 567
    },
    {
        "xk": "2p",
        "yk": "Sunday",
        "value": 4,
        "value2": 235
    },
    {
        "xk": "3p",
        "yk": "Saturday",
        "value": 2,
        "value2": 185
    },
    {
        "xk": "3p",
        "yk": "Friday",
        "value": 4,
        "value2": 80
    },
    {
        "xk": "3p",
        "yk": "Thursday",
        "value": 8,
        "value2": 744
    },
    {
        "xk": "3p",
        "yk": "Wednesday",
        "value": 1,
        "value2": 134
    },
    {
        "xk": "3p",
        "yk": "Tuesday",
        "value": 7,
        "value2": 901
    },
    {
        "xk": "3p",
        "yk": "Monday",
        "value": 3,
        "value2": 215
    },
    {
        "xk": "3p",
        "yk": "Sunday",
        "value": 3,
        "value2": 381
    },
    {
        "xk": "4p",
        "yk": "Saturday",
        "value": 7,
        "value2": 455
    },
    {
        "xk": "4p",
        "yk": "Friday",
        "value": 7,
        "value2": 797
    },
    {
        "xk": "4p",
        "yk": "Thursday",
        "value": 5,
        "value2": 137
    },
    {
        "xk": "4p",
        "yk": "Wednesday",
        "value": 2,
        "value2": 826
    },
    {
        "xk": "4p",
        "yk": "Tuesday",
        "value": 4,
        "value2": 913
    },
    {
        "xk": "4p",
        "yk": "Monday",
        "value": 8,
        "value2": 981
    },
    {
        "xk": "4p",
        "yk": "Sunday",
        "value": 2,
        "value2": 815
    },
    {
        "xk": "5p",
        "yk": "Saturday",
        "value": 8,
        "value2": 452
    },
    {
        "xk": "5p",
        "yk": "Friday",
        "value": 5,
        "value2": 683
    },
    {
        "xk": "5p",
        "yk": "Thursday",
        "value": 2,
        "value2": 698
    },
    {
        "xk": "5p",
        "yk": "Wednesday",
        "value": 2,
        "value2": 945
    },
    {
        "xk": "5p",
        "yk": "Tuesday",
        "value": 2,
        "value2": 20
    },
    {
        "xk": "5p",
        "yk": "Monday",
        "value": 9,
        "value2": 349
    },
    {
        "xk": "5p",
        "yk": "Sunday",
        "value": 8,
        "value2": 636
    },
    {
        "xk": "6p",
        "yk": "Saturday",
        "value": 5,
        "value2": 589
    },
    {
        "xk": "6p",
        "yk": "Friday",
        "value": 7,
        "value2": 127
    },
    {
        "xk": "6p",
        "yk": "Thursday",
        "value": 6,
        "value2": 571
    },
    {
        "xk": "6p",
        "yk": "Wednesday",
        "value": 0,
        "value2": 654
    },
    {
        "xk": "6p",
        "yk": "Tuesday",
        "value": 2,
        "value2": 454
    },
    {
        "xk": "6p",
        "yk": "Monday",
        "value": 5,
        "value2": 291
    },
    {
        "xk": "6p",
        "yk": "Sunday",
        "value": 6,
        "value2": 53
    },
    {
        "xk": "7p",
        "yk": "Saturday",
        "value": 2,
        "value2": 572
    },
    {
        "xk": "7p",
        "yk": "Friday",
        "value": 0,
        "value2": 395
    },
    {
        "xk": "7p",
        "yk": "Thursday",
        "value": 4,
        "value2": 778
    },
    {
        "xk": "7p",
        "yk": "Wednesday",
        "value": 9,
        "value2": 738
    },
    {
        "xk": "7p",
        "yk": "Tuesday",
        "value": 6,
        "value2": 745
    },
    {
        "xk": "7p",
        "yk": "Monday",
        "value": 6,
        "value2": 369
    },
    {
        "xk": "7p",
        "yk": "Sunday",
        "value": 0,
        "value2": 657
    },
    {
        "xk": "8p",
        "yk": "Saturday",
        "value": 2,
        "value2": 512
    },
    {
        "xk": "8p",
        "yk": "Friday",
        "value": 3,
        "value2": 225
    },
    {
        "xk": "8p",
        "yk": "Thursday",
        "value": 2,
        "value2": 88
    },
    {
        "xk": "8p",
        "yk": "Wednesday",
        "value": 6,
        "value2": 921
    },
    {
        "xk": "8p",
        "yk": "Tuesday",
        "value": 7,
        "value2": 563
    },
    {
        "xk": "8p",
        "yk": "Monday",
        "value": 0,
        "value2": 457
    },
    {
        "xk": "8p",
        "yk": "Sunday",
        "value": 7,
        "value2": 831
    },
    {
        "xk": "9p",
        "yk": "Saturday",
        "value": 8,
        "value2": 613
    },
    {
        "xk": "9p",
        "yk": "Friday",
        "value": 5,
        "value2": 936
    },
    {
        "xk": "9p",
        "yk": "Thursday",
        "value": 7,
        "value2": 346
    },
    {
        "xk": "9p",
        "yk": "Wednesday",
        "value": 7,
        "value2": 267
    },
    {
        "xk": "9p",
        "yk": "Tuesday",
        "value": 5,
        "value2": 882
    },
    {
        "xk": "9p",
        "yk": "Monday",
        "value": 7,
        "value2": 349
    },
    {
        "xk": "9p",
        "yk": "Sunday",
        "value": 5,
        "value2": 851
    },
    {
        "xk": "10p",
        "yk": "Saturday",
        "value": 3,
        "value2": 600
    },
    {
        "xk": "10p",
        "yk": "Friday",
        "value": 1,
        "value2": 332
    },
    {
        "xk": "10p",
        "yk": "Thursday",
        "value": 6,
        "value2": 801
    },
    {
        "xk": "10p",
        "yk": "Wednesday",
        "value": 6,
        "value2": 105
    },
    {
        "xk": "10p",
        "yk": "Tuesday",
        "value": 8,
        "value2": 580
    },
    {
        "xk": "10p",
        "yk": "Monday",
        "value": 2,
        "value2": 888
    },
    {
        "xk": "10p",
        "yk": "Sunday",
        "value": 1,
        "value2": 481
    },
    {
        "xk": "11p",
        "yk": "Saturday",
        "value": 5,
        "value2": 958
    },
    {
        "xk": "11p",
        "yk": "Friday",
        "value": 9,
        "value2": 705
    },
    {
        "xk": "11p",
        "yk": "Thursday",
        "value": 6,
        "value2": 962
    },
    {
        "xk": "11p",
        "yk": "Wednesday",
        "value": 9,
        "value2": 94
    },
    {
        "xk": "11p",
        "yk": "Tuesday",
        "value": 1,
        "value2": 766
    },
    {
        "xk": "11p",
        "yk": "Monday",
        "value": 0,
        "value2": 733
    },
    {
        "xk": "11p",
        "yk": "Sunday",
        "value": 7,
        "value2": 449
    },
    {
        "xk": "12p",
        "yk": "Saturday",
        "value": 5,
        "value2": 132
    },
    {
        "xk": "12p",
        "yk": "Friday",
        "value": 1,
        "value2": 49
    },
    {
        "xk": "12p",
        "yk": "Thursday",
        "value": 9,
        "value2": 378
    },
    {
        "xk": "12p",
        "yk": "Wednesday",
        "value": 5,
        "value2": 395
    },
    {
        "xk": "12p",
        "yk": "Tuesday",
        "value": 7,
        "value2": 749
    },
    {
        "xk": "12p",
        "yk": "Monday",
        "value": 7,
        "value2": 1008
    },
    {
        "xk": "12p",
        "yk": "Sunday",
        "value": 3,
        "value2": 529
    }
]
export default { code, data, datasetMeta }