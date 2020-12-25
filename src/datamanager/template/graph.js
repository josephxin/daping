const code = 'graph';
let datasetMeta = [{
        columnName: 'startNode',
        columnDesc: '起始节点',
        columnDefDire: 1
    },
    {
        columnName: 'endNode',
        columnDesc: '结束节点',
        columnDefDire: 1
    },
    {
        columnName: 'nodeType',
        columnDesc: '节点类型',
        columnDefDire: 1
    },
    {
        columnName: 'value',
        columnDesc: '节点值',
        columnDefDire: 1
    }
]
let data = [{
        "startNode": "区域经济主题",
        "endNode": "主要社会经济指标",
        "value": 3,
        "nodeType": "类目"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "地区生产总值情况",
        "value": 3,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "地区生产总值情况",
        "endNode": "地区生产总值同比增长",
        "value": 15,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "地区生产总值同比增长",
        "endNode": "地区生产总值",
        "value": 1,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "地区生产总值同比增长",
        "endNode": "地区生产总值计划增长",
        "value": 25,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "地区生产总值情况",
        "endNode": "第二产业同比增长",
        "value": 6,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "第二产业同比增长",
        "endNode": "第二产业总值",
        "value": 13,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "地区生产总值情况",
        "endNode": "第三产业同比增长",
        "value": 12,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "第三产业同比增长",
        "endNode": "第三产业总值",
        "value": 29,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "地区生产总值情况",
        "endNode": "现代服务业同比增长",
        "value": 8,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "现代服务业同比增长",
        "endNode": "现代服务业增加值",
        "value": 22,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "地区生产总值情况",
        "endNode": "民营经济同比增长",
        "value": 5,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "民营经济同比增长",
        "endNode": "民营经济增加值",
        "value": 15,
        "nodeType": "地区生产总值情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "财政收入情况",
        "value": 14,
        "nodeType": "财政收入情况"
    },
    {
        "startNode": "财政收入情况",
        "endNode": "财政收入同比增长",
        "value": 13,
        "nodeType": "财政收入情况"
    },
    {
        "startNode": "财政收入同比增长",
        "endNode": "财政收入金额",
        "value": 10,
        "nodeType": "财政收入情况"
    },
    {
        "startNode": "财政收入情况",
        "endNode": "留区一般预算财政收入同比增长",
        "value": 16,
        "nodeType": "财政收入情况"
    },
    {
        "startNode": "留区一般预算财政收入同比增长",
        "endNode": "留区一般预算财政收入金额",
        "value": 20,
        "nodeType": "财政收入情况"
    },
    {
        "startNode": "财政收入情况",
        "endNode": "区级财政支出金额同比增长",
        "value": 28,
        "nodeType": "财政收入情况"
    },
    {
        "startNode": "区级财政支出金额同比增长",
        "endNode": "区级财政支出金额",
        "value": 6,
        "nodeType": "财政收入情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "税收情况",
        "value": 11,
        "nodeType": "税收情况"
    },
    {
        "startNode": "税收情况",
        "endNode": "地税税收同比增长",
        "value": 0,
        "nodeType": "税收情况"
    },
    {
        "startNode": "地税税收同比增长",
        "endNode": "地税主要税种完成税收情况",
        "value": 13,
        "nodeType": "税收情况"
    },
    {
        "startNode": "地税主要税种完成税收情况",
        "endNode": "营业税",
        "value": 8,
        "nodeType": "税收情况"
    },
    {
        "startNode": "地税主要税种完成税收情况",
        "endNode": "个人所得税",
        "value": 21,
        "nodeType": "税收情况"
    },
    {
        "startNode": "地税主要税种完成税收情况",
        "endNode": "城建税（地税）",
        "value": 10,
        "nodeType": "税收情况"
    },
    {
        "startNode": "地税主要税种完成税收情况",
        "endNode": "企业所得税（地税）",
        "value": 15,
        "nodeType": "税收情况"
    },
    {
        "startNode": "地税主要税种完成税收情况",
        "endNode": "其他税(含费）",
        "value": 26,
        "nodeType": "税收情况"
    },
    {
        "startNode": "税收情况",
        "endNode": "国税税收同比增长",
        "value": 8,
        "nodeType": "税收情况"
    },
    {
        "startNode": "国税税收同比增长",
        "endNode": "国税分税种完成税收情况",
        "value": 11,
        "nodeType": "税收情况"
    },
    {
        "startNode": "国税分税种完成税收情况",
        "endNode": "增值税",
        "value": 26,
        "nodeType": "税收情况"
    },
    {
        "startNode": "国税分税种完成税收情况",
        "endNode": "消费税",
        "value": 17,
        "nodeType": "税收情况"
    },
    {
        "startNode": "国税分税种完成税收情况",
        "endNode": "企业所得税(国税)",
        "value": 6,
        "nodeType": "税收情况"
    },
    {
        "startNode": "国税分税种完成税收情况",
        "endNode": "城建税(国税)",
        "value": 23,
        "nodeType": "税收情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "区域固定资产投资情况",
        "value": 15,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "域固定资产投资情况",
        "endNode": "区域固定资产投资同比增长",
        "value": 22,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "区域固定资产投资同比增长",
        "endNode": "区域固定资产投资额",
        "value": 8,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "域固定资产投资情况",
        "endNode": "开工项目同比增长",
        "value": 21,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "开工项目同比增长",
        "endNode": "开工项目数",
        "value": 21,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "开工项目数",
        "endNode": "社会事业项目数",
        "value": 17,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "开工项目数",
        "endNode": "商业酒店写字楼项目数",
        "value": 8,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "开工项目数",
        "endNode": "住宅公寓项目数",
        "value": 2,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "域固定资产投资情况",
        "endNode": "开工面积同比增长",
        "value": 9,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "开工面积同比增长",
        "endNode": "开工面积",
        "value": 12,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "开工面积",
        "endNode": "社会事业面积数",
        "value": 21,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "开工面积",
        "endNode": "商业酒店写字楼面积数",
        "value": 5,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "开工面积",
        "endNode": "住宅公寓面积数",
        "value": 24,
        "nodeType": "区域固定资产投资情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "招商引资情况",
        "value": 17,
        "nodeType": "招商引资情况"
    },
    {
        "startNode": "招商引资情况",
        "endNode": "直接利用外资同比增长",
        "value": 23,
        "nodeType": "招商引资情况"
    },
    {
        "startNode": "直接利用外资同比增长",
        "endNode": "直接利用外资到位额",
        "value": 3,
        "nodeType": "招商引资情况"
    },
    {
        "startNode": "直接利用外资同比增长",
        "endNode": "当期直接利用外资增长额",
        "value": 2,
        "nodeType": "招商引资情况"
    },
    {
        "startNode": "招商引资情况",
        "endNode": "国内招商引资同比增长",
        "value": 14,
        "nodeType": "招商引资情况"
    },
    {
        "startNode": "国内招商引资同比增长",
        "endNode": "国内招商引资到位额",
        "value": 13,
        "nodeType": "招商引资情况"
    },
    {
        "startNode": "国内招商引资同比增长",
        "endNode": "当期国内招商引资增长额",
        "value": 19,
        "nodeType": "招商引资情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "工商登记注册情况",
        "value": 26,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "工商登记注册情况",
        "endNode": "实有经济主体数同比增长",
        "value": 5,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "实有经济主体数同比增长",
        "endNode": "实有经济主体",
        "value": 25,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "实有经济主体",
        "endNode": "个体工商户注册数",
        "value": 2,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "实有经济主体",
        "endNode": "私营企业注册数",
        "value": 28,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "实有经济主体",
        "endNode": "内资企业注册数",
        "value": 26,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "实有经济主体数同比增长",
        "endNode": "本年新增经济主体",
        "value": 5,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "本年新增经济主体",
        "endNode": "个体工商户新增数",
        "value": 12,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "本年新增经济主体",
        "endNode": "私营企业新增数",
        "value": 11,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "本年新增经济主体",
        "endNode": "内资企业新增数",
        "value": 26,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "工商登记注册情况",
        "endNode": "外资企业及分支机构注册数同比增长",
        "value": 15,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "外资企业及分支机构注册数同比增长",
        "endNode": "外资企业及分支机构注册数",
        "value": 5,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "外资企业及分支机构注册数同比增长",
        "endNode": "外资企业及分支机构新增数",
        "value": 7,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "工商登记注册情况",
        "endNode": "本年新增注册资金同比增长",
        "value": 12,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "本年新增注册资金同比增长",
        "endNode": "本年新增注册资金",
        "value": 9,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "本年新增注册资金",
        "endNode": "个体工商户新增注册资金",
        "value": 26,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "本年新增注册资金",
        "endNode": "私营企业新增注册资金",
        "value": 5,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "本年新增注册资金",
        "endNode": "内资企业新增注册资金",
        "value": 2,
        "nodeType": "工商登记注册情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "增加就业情况",
        "value": 17,
        "nodeType": "增加就业情况"
    },
    {
        "startNode": "增加就业情况",
        "endNode": "增加就业人数同比增长",
        "value": 11,
        "nodeType": "增加就业情况"
    },
    {
        "startNode": "增加就业人数同比增长",
        "endNode": "增加就业人数",
        "value": 17,
        "nodeType": "增加就业情况"
    },
    {
        "startNode": "增加就业人数同比增长",
        "endNode": "城镇登记失业率",
        "value": 26,
        "nodeType": "增加就业情况"
    },
    {
        "startNode": "增加就业人数同比增长",
        "endNode": "企业职工基本养老保险缴费人数",
        "value": 27,
        "nodeType": "增加就业情况"
    },
    {
        "startNode": "增加就业人数同比增长",
        "endNode": "企业职工基本医疗保险缴费人数",
        "value": 28,
        "nodeType": "增加就业情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "重点企业指标情况",
        "value": 12,
        "nodeType": "重点企业指标情况"
    },
    {
        "startNode": "重点企业指标情况",
        "endNode": "批发零售业前20名销售额同比增长",
        "value": 16,
        "nodeType": "重点企业指标情况"
    },
    {
        "startNode": "批发零售业前20名销售额同比增长",
        "endNode": "批发零售业前20名企业销售额",
        "value": 7,
        "nodeType": "重点企业指标情况"
    },
    {
        "startNode": "批发零售业前20名销售额同比增长",
        "endNode": "批发零售业前20名企业营业利润",
        "value": 25,
        "nodeType": "重点企业指标情况"
    },
    {
        "startNode": "重点企业指标情况",
        "endNode": "房地产业前10名企业增加值同比增长",
        "value": 27,
        "nodeType": "重点企业指标情况"
    },
    {
        "startNode": "房地产业前10名企业增加值同比增长",
        "endNode": "房地产业前10名企业增加值主体项之和",
        "value": 0,
        "nodeType": "重点企业指标情况"
    },
    {
        "startNode": "房地产业前10名企业增加值同比增长",
        "endNode": "房地产业后10名企业增加值主体项之和",
        "value": 27,
        "nodeType": "重点企业指标情况"
    },
    {
        "startNode": "重点企业指标情况",
        "endNode": "其他服务业增加值同比增长",
        "value": 16,
        "nodeType": "重点企业指标情况"
    },
    {
        "startNode": "其他服务业增加值同比增长",
        "endNode": "其他服务业前10名企业增加值主体项之和",
        "value": 3,
        "nodeType": "重点企业指标情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "消费品零售情况",
        "value": 5,
        "nodeType": "消费品零售情况"
    },
    {
        "startNode": "消费品零售情况",
        "endNode": "消费品零售额同比增长",
        "value": 3,
        "nodeType": "消费品零售情况"
    },
    {
        "startNode": "消费品零售额同比增长",
        "endNode": "消费品零售总额",
        "value": 4,
        "nodeType": "消费品零售情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "外贸出口情况",
        "value": 12,
        "nodeType": "外贸出口情况"
    },
    {
        "startNode": "外贸出口情况",
        "endNode": "外贸出口额同比增长",
        "value": 19,
        "nodeType": "外贸出口情况"
    },
    {
        "startNode": "外贸出口额同比增长",
        "endNode": "外贸出口总额",
        "value": 13,
        "nodeType": "外贸出口情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "居民收入情况",
        "value": 12,
        "nodeType": "居民收入情况"
    },
    {
        "startNode": "居民收入情况",
        "endNode": "居民人均可支配收入同比增长",
        "value": 12,
        "nodeType": "居民收入情况"
    },
    {
        "startNode": "居民人均可支配收入同比增长",
        "endNode": "居民人均可支配收入",
        "value": 15,
        "nodeType": "居民收入情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "市内六区对比情况",
        "value": 1,
        "nodeType": "市内六区对比情况"
    },
    {
        "startNode": "市内六区对比情况",
        "endNode": "市内六区地域生产总值排名",
        "value": 12,
        "nodeType": "市内六区对比情况"
    },
    {
        "startNode": "市内六区地域生产总值排名",
        "endNode": "地域生产总值",
        "value": 27,
        "nodeType": "市内六区对比情况"
    },
    {
        "startNode": "地域生产总值",
        "endNode": "和平区季度生产总值",
        "value": 29,
        "nodeType": "市内六区对比情况"
    },
    {
        "startNode": "地域生产总值",
        "endNode": "南开区季度生产总值",
        "value": 8,
        "nodeType": "市内六区对比情况"
    },
    {
        "startNode": "地域生产总值",
        "endNode": "河西区季度生产总值",
        "value": 11,
        "nodeType": "市内六区对比情况"
    },
    {
        "startNode": "地域生产总值",
        "endNode": "河北区季度生产总值",
        "value": 11,
        "nodeType": "市内六区对比情况"
    },
    {
        "startNode": "地域生产总值",
        "endNode": "红桥区季度生产总值",
        "value": 19,
        "nodeType": "市内六区对比情况"
    },
    {
        "startNode": "地域生产总值",
        "endNode": "河东区季度生产总值",
        "value": 7,
        "nodeType": "市内六区对比情况"
    },
    {
        "startNode": "主要社会经济指标",
        "endNode": "友好城市对比情况",
        "value": 20,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "友好城市对比情况",
        "endNode": "友好城市生产总值排名",
        "value": 5,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "友好城市生产总值排名",
        "endNode": "友好城市生产总值",
        "value": 22,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "友好城市生产总值",
        "endNode": "天津市和平区季度生产总值",
        "value": 11,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "友好城市生产总值",
        "endNode": "北京市东城区季度生产总值",
        "value": 5,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "友好城市生产总值",
        "endNode": "北京市西城区季度生产总值",
        "value": 27,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "友好城市生产总值",
        "endNode": "深圳市罗湖区季度生产总值",
        "value": 27,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "友好城市生产总值",
        "endNode": "广州市越秀区季度生产总值",
        "value": 13,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "友好城市生产总值",
        "endNode": "杭州市下城区季度生产总值",
        "value": 14,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "友好城市生产总值",
        "endNode": "上海市徐汇区季度生产总值",
        "value": 13,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "友好城市生产总值",
        "endNode": "重庆市渝中区季度生产总值",
        "value": 8,
        "nodeType": "友好城市对比情况"
    },
    {
        "startNode": "区域经济主题",
        "endNode": "招商项目指标",
        "value": 21,
        "nodeType": "类目"
    },
    {
        "startNode": "招商项目指标",
        "endNode": "招商项目情况",
        "value": 3,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目情况",
        "endNode": "招商项目数量同比增长",
        "value": 15,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目数量同比增长",
        "endNode": "招商项目数量情况",
        "value": 10,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目数量情况",
        "endNode": "商务载体项目数",
        "value": 11,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目数量情况",
        "endNode": "商业载体项目数",
        "value": 27,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目数量情况",
        "endNode": "土地载体项目数",
        "value": 10,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目数量情况",
        "endNode": "风貌小洋楼项目数",
        "value": 11,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目数量情况",
        "endNode": "普通小洋楼项目数",
        "value": 6,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目数量情况",
        "endNode": "新建小洋楼项目数",
        "value": 9,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目情况",
        "endNode": "可招商面积同比增长",
        "value": 15,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "可招商面积同比增长",
        "endNode": "招商项目面积情况",
        "value": 6,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目面积情况",
        "endNode": "商务载体可招商面积",
        "value": 23,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目面积情况",
        "endNode": "商业载体可招商面积",
        "value": 13,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目面积情况",
        "endNode": "土地载体可招商面积",
        "value": 20,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目面积情况",
        "endNode": "风貌小洋楼可招商面积",
        "value": 21,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目面积情况",
        "endNode": "普通小洋楼可招商面积",
        "value": 16,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "招商项目面积情况",
        "endNode": "新建小洋楼可招商面积",
        "value": 10,
        "nodeType": "招商项目情况"
    },
    {
        "startNode": "区域经济主题",
        "endNode": "楼宇经济指标",
        "value": 25,
        "nodeType": "类目"
    },
    {
        "startNode": "楼宇经济指标",
        "endNode": "楼宇情况",
        "value": 18,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "楼宇情况",
        "endNode": "统计楼宇数同比增长",
        "value": 0,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "统计楼宇数同比增长",
        "endNode": "楼宇物业等级",
        "value": 16,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "楼宇物业等级",
        "endNode": "一级楼宇数",
        "value": 25,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "楼宇物业等级",
        "endNode": "二级楼宇数",
        "value": 1,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "楼宇物业等级",
        "endNode": "三级楼宇数",
        "value": 16,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "楼宇物业等级",
        "endNode": "其他楼宇数",
        "value": 23,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "楼宇情况",
        "endNode": "全口径税收金额同比增长",
        "value": 15,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "全口径税收金额同比增长",
        "endNode": "全口径税收金额",
        "value": 3,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "全口径税收金额同比增长",
        "endNode": "全口径税收类别",
        "value": 4,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "全口径税收类别",
        "endNode": "亿元楼宇数",
        "value": 10,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "全口径税收类别",
        "endNode": "大于5千万楼宇数",
        "value": 9,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "全口径税收类别",
        "endNode": "大于3千万楼宇数",
        "value": 4,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "全口径税收类别",
        "endNode": "大于1千万楼宇数",
        "value": 29,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "全口径税收类别",
        "endNode": "小于1千万楼宇数",
        "value": 27,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "楼宇情况",
        "endNode": "亿元楼宇数同比增长",
        "value": 4,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "楼宇情况",
        "endNode": "亿元楼宇税收额同比增长",
        "value": 2,
        "nodeType": "楼宇情况"
    },
    {
        "startNode": "楼宇经济指标",
        "endNode": "注册企业情况",
        "value": 29,
        "nodeType": "注册企业情况"
    },
    {
        "startNode": "注册企业情况",
        "endNode": "注册企业数同比增长",
        "value": 20,
        "nodeType": "注册企业情况"
    },
    {
        "startNode": "注册企业数同比增长",
        "endNode": "注册企业总数",
        "value": 10,
        "nodeType": "注册企业情况"
    },
    {
        "startNode": "注册企业数同比增长",
        "endNode": "当期新增注册企业数",
        "value": 26,
        "nodeType": "注册企业情况"
    },
    {
        "startNode": "注册企业数同比增长",
        "endNode": "亿元楼宇企业数",
        "value": 1,
        "nodeType": "注册企业情况"
    },
    {
        "startNode": "区域经济主题",
        "endNode": "互联网电商指标",
        "value": 26,
        "nodeType": "类目"
    },
    {
        "startNode": "互联网电商指标",
        "endNode": "总体指标",
        "value": 18,
        "nodeType": "总体指标"
    },
    {
        "startNode": "总体指标",
        "endNode": "区域电商指数",
        "value": 11,
        "nodeType": "总体指标"
    },
    {
        "startNode": "总体指标",
        "endNode": "区域人口质量",
        "value": 2,
        "nodeType": "总体指标"
    },
    {
        "startNode": "总体指标",
        "endNode": "区域幸福指数",
        "value": 12,
        "nodeType": "总体指标"
    },
    {
        "startNode": "互联网电商指标",
        "endNode": "网商指标",
        "value": 27,
        "nodeType": "网商指标"
    },
    {
        "startNode": "网商指标",
        "endNode": "网商指数",
        "value": 28,
        "nodeType": "网商指标"
    },
    {
        "startNode": "网商指标",
        "endNode": "店铺活跃度",
        "value": 7,
        "nodeType": "网商指标"
    },
    {
        "startNode": "网商指标",
        "endNode": "网商指数排名",
        "value": 3,
        "nodeType": "网商指标"
    },
    {
        "startNode": "互联网电商指标",
        "endNode": "网购指标",
        "value": 12,
        "nodeType": "网购指标"
    },
    {
        "startNode": "网购指标",
        "endNode": "网购指数",
        "value": 9,
        "nodeType": "网购指标"
    },
    {
        "startNode": "网购指标",
        "endNode": "消费活跃度",
        "value": 19,
        "nodeType": "网购指标"
    },
    {
        "startNode": "网购指标",
        "endNode": "网购指数排名",
        "value": 24,
        "nodeType": "网购指标"
    }
]
export default { code, data, datasetMeta }