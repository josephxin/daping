const option = function() {
    return {
        stack: '0',
        seriesLayoutBy: 'column',
        type: 'bar',
        categoryX: true, //x轴为维度轴
        backgroundColor: 'rgba(0,0,0,0)',
        colors: [],
        title: {
            isShow: true,
            title: '柱图', // 标题内容
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
        x: {
            position: 'bottom',
            isShow: true, // 是否显示 true or false
            // 样式
            styleColor: '#99b4d5', // 样式颜色 合法的颜色值
            styleArrow: 'none', // 箭头样式 值域待定
            styleBold: 1, // 样式粗细
            showTick: false, // TODO 需要增加表单项 是否显示坐标轴刻度。
            showLine: true, // TODO 需要增加表单项 是否显示坐标轴轴线。
            //刻度
            axisTick: false,
            axisTickLehgth: 5,
            axisTickInside: false,
            alignWithLabel: false,
            tickColor: '#99b4d5',
            tickWidth: 1,
            tickStyle: 'solid',
            tickOpacity: 1,
            // 单位
            isUnit: false, // 是否显示
            unitName: '', // 单位名称
            unitFontFamily: 'Microsoft Yahei', // 单位字体
            unitFontSize: 16, // 单位字号
            unitFontColor: 'white',

            // 轴标签
            isAxisLabel: true, // 是否显示轴标签
            wordDirection: '', // 字体方向
            labelMargin: 10,
            labelSize: 16,
            labelColor: '#ffffff',
            fontFamily: 'Microsoft Yahei', // TODO 需要增加表单项

            // 网格线
            isGrid: false, // 是否显示
            gridColor: '#ffffff', // 网格线颜色
            gridBold: 1, // 网格线粗细
            gridOpaque: 1, // 网格线透明度
            splitLineType: 'solid', // TODO 需要增加表单项
            boundaryGap: 10,
            min: 0,
            max: 0,
            showMaxMin: false
        },
        y: {
            isShow: true, // 是否显示 true or false
            position: 'left',
            offset: 0, //偏移量
            // 样式
            styleColor: '#99b4d5', // 样式颜色 合法的颜色值
            styleArrow: 'none', // 箭头样式 值域待定
            styleBold: 1, // 样式粗细
            showTick: false, // TODO 需要增加表单项 是否显示坐标轴刻度。
            showLine: true, // TODO 需要增加表单项 是否显示坐标轴轴线。
            labelFormatUnit: '', //轴数据单位
            //刻度
            axisTick: false,
            axisTickLehgth: 5,
            axisTickInside: false,
            alignWithLabel: false,
            tickColor: '#99b4d5',
            tickWidth: 1,
            tickStyle: 'solid',
            tickOpacity: 1,
            // 单位
            isUnit: false, // 是否显示
            unitName: '', // 单位名称
            nameGap: 0, // 单位与轴线的距离
            namePadding: "0,0,0,0", //名称的padding值
            unitFontFamily: 'Microsoft Yahei', // 单位字体
            unitFontSize: 16, // 单位字号
            unitFontColor: 'white',
            nameLocation: 'center', //单位位置
            nameRotate: 0, //单位的旋转角度
            // 轴标签
            isAxisLabel: true, // 是否显示轴标签
            wordDirection: '', // 字体方向
            labelMargin: 10,
            labelSize: 16,
            labelColor: '#ffffff',
            fontFamily: 'Microsoft Yahei', // TODO 需要增加表单项

            // 网格线
            isGrid: true, // 是否显示
            gridColor: '#ffffff', // 网格线颜色
            gridBold: 1, // 网格线粗细
            gridOpaque: 1, // 网格线透明度
            splitLineType: 'solid', // TODO 需要增加表单项
            boundaryGap: 0,
            min: 0,
            max: 0,
            showMaxMin: false
        },
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
        series: [],
        dataLabel: false,
        dataLabelSize: 24,
        dataLabelColor: 'white',
        dataPosition: 'inside',
        barGap: 0,
        barCategoryGap: '50%',
        // TODO 需要增加表单项
        barWidth: '10%',
        // TODO 需要增加表单项 柱圆角 （顺时针左上，右上，右下，左下）
        barBorderRadius: "0,0,0,0",
        topPadding: 30,
        bottomPadding: 40,
        leftPadding: 40,
        rightPadding: 0,
        // 区域缩放配置
        dataZoomShow: false,
        // markPoint 数值标记
        markPointShow: false,
        markPointData: ['max'], //标记值类型
        markPointSymbol: 'pin', //标记样式
        //markLine 标记线配置
        markLineShow: false,
        markLineData: ['average'],
        markLineSymbol: 'arrow',
        multipleY: {
            show: false,
            configs: []
        },
        tooltip: {
            show: true,
            axisPointer: {
                type: 'shadow'
            }
        }
    }
}
export default option