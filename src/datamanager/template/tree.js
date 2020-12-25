const code = 'tree';
let datasetMeta = [{
        columnName: 'name',
        columnDesc: '名称',
        columnDefDire: 1
    },
    {
        columnName: 'parentName',
        columnDesc: '父级名称',
        columnDefDire: 1
    }
]
let data = [{
        name: '治安管理工作',
        parentName: ''
    }, {
        name: '娱乐场所治安管理',
        parentName: '治安管理工作'
    }, {
        name: '安保工作',
        parentName: '治安管理工作'
    }, {
        name: '精神病人管控工作',
        parentName: '治安管理工作'
    }, {
        name: '物流寄递业',
        parentName: '治安管理工作'
    }, {
        name: '推进基层基础工作创新',
        parentName: '治安管理工作'
    }, {
        name: '地网建设工作',
        parentName: '治安管理工作'
    }, {
        name: '无人机管理',
        parentName: '治安管理工作'
    }, {
        name: '加强社会面巡逻防控',
        parentName: '治安管理工作'
    },
    {
        name: '娱乐场所治安管理工作',
        parentName: '娱乐场所治安管理'
    },
    {
        name: '输油气管道安保工作',
        parentName: '安保工作'
    },
    {
        name: '校园安保工作',
        parentName: '安保工作'
    },
    {
        name: '节假日、重大活动、大型群众性活动安保和敏感期社会面管控工作',
        parentName: '安保工作'
    },
    {
        name: '精神病人肇事肇祸案件',
        parentName: '精神病人管控工作'
    },
    {
        name: '物流寄递业治安管理工作',
        parentName: '物流寄递业'
    },
    {
        name: '加强派出所建设',
        parentName: '推进基层基础工作创新'
    },
    {
        name: '加强二轮电动车防盗登记备案装置安装工作',
        parentName: '地网建设工作'
    },
    {
        name: '加强无人机管理',
        parentName: '无人机管理'
    },
    {
        name: '武装联勤巡逻',
        parentName: '加强社会面巡逻防控'
    }
]
export default { code, data, datasetMeta }