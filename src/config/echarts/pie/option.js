const option = function() {
    return {
        roseType: 'area', //饼图类型
        type: 'pie',
        roseShow: false, //是否南丁格尔图
        pieInner: 0,
        pieOuter: 80,
        backgroundColor: 'rgba(0,0,0,0)',
        colors: [], //风格配色
        topPadding: 30,
        bottomPadding: 40,
        leftPadding: 40,
        rightPadding: 0,
        title: {
            isShow: true,
            title: '饼图', // 标题内容
            textStyleColor: '#fff', //标题颜色
            textStyleFontStyle: 'normal', // 字体风格
            textStyleFontWeight: 'normal', // 字体粗细
            textStyleFontFamily: 'Microsoft Yahei', // 字体
            textStyleFontSize: 14,
            left: 'auto',
            top: 'auto',
            right: 'auto',
            bottom: 'auto'
        },
        lableShowList: ['name'],
        legend: {
            isShow: true, // 是否显示
            width: 'auto',
            type: 'plain', //图例类型
            fontColor: '#ffffff', // 字体颜色
            fontSize: 16, // 字体大小
            fontBold: '', // 字体粗细
            fontFamily: 'Microsoft Yahei', // TODO 需要增加表单项
            icon: 'rect',
            iconWidth: 25,
            iconHeight: 14,
            position: 'center-top', // 位置
            layout: 'horizontal', // 布局
            padding: "5,5,5,5", //图例内边距
            itemGap: 5, //图例间距
        },
    }
}
export default option