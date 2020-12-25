import * as L from 'leaflet'

export const defaultGridOpt = {
    fillStyle: 'rgba(55, 50, 250, 0.8)',
    shadowColor: 'rgba(255, 250, 50, 1)',
    shadowBlur: 10,
    size: 40,
    globalAlpha: 0.5,
    label: {
        show: true,
        fillStyle: 'white',
        shadowColor: 'yellow',
        font: '15px Arial',
        shadowBlur: 10
    },
    _gradient: [
        {val: 0, color: "rgba(49, 54, 149, 0)"},
        {val: 0.2, color: "rgba(69,117,180, 0.7)"},
        {val: 0.3, color: "rgba(116,173,209, 0.7)"},
        {val: 0.4, color: "rgba(171,217,233, 0.7)"},
        {val: 0.5, color: "rgba(224,243,248, 0.7)"},
        {val: 0.6, color: "rgba(254,224,144,0.7)"},
        {val: 0.7, color: "rgba(253,174,97,0.7)"},
        {val: 0.8, color: "rgba(244,109,67,0.8)"},
        {val: 0.9, color: "rgba(215,48,39,0.8)"},
        {val: 0.95, color: "rgba(165, 0, 38,0.8)"},
    ],
    draw: 'grid'
}
export const defaultHeatOpt = {
    size: 20,
    _gradient: [
        {val: 0, color: "rgba(49, 54, 149, 0)"},
        {val: 0.2, color: "rgba(69,117,180, 0.7)"},
        {val: 0.3, color: "rgba(116,173,209, 0.7)"},
        {val: 0.4, color: "rgba(171,217,233, 0.7)"},
        {val: 0.5, color: "rgba(224,243,248, 0.7)"},
        {val: 0.6, color: "rgba(254,224,144,0.7)"},
        {val: 0.7, color: "rgba(253,174,97,0.7)"},
        {val: 0.8, color: "rgba(244,109,67,0.8)"},
        {val: 0.9, color: "rgba(215,48,39,0.8)"},
        {val: 0.95, color: "rgba(165, 0, 38,0.8)"},
    ],
    draw: 'heatmap'
}
export const defaultClusterOpt = {
    maxClusterRadius: 80,//The maximum radius that a cluster will cover from the central marker
    iconCreateFunction: null,//Function used to create the cluster icon
    clusterPane: L.Marker.prototype.options.pane,
    spiderfyOnMaxZoom: false,// When you click a cluster at the bottom zoom level we spiderfy it so you can see all of its markers.
    showCoverageOnHover: true,//When you mouse over a cluster it shows the bounds of its markers.
    zoomToBoundsOnClick: false,//When you click a cluster we zoom to its bounds.
    singleMarkerMode: false,//If set to true, overrides the icon for all added markers to make them appear as a 1 size cluster
    disableClusteringAtZoom: null,// If set, at this zoom level and below, markers will not be clustered
    removeOutsideVisibleBounds: true,//Clusters and markers too far from the viewport are removed from the map for performance.
    animate: true,//Smoothly split / merge cluster children when zooming and spiderfying.
    animateAddingMarkers: false,
    spiderfyDistanceMultiplier: 1,//Increase from 1 to increase the distance away from the center that spiderfied markers are placed
    spiderLegPolylineOptions: {weight: 1.5, color: '#222', opacity: 0.5},//Allows you to specify PolylineOptions to style spider legs.
    chunkedLoading: true,// Boolean to split the addLayers processing in to small intervals so that the page does not freeze.
    chunkInterval: 200,//Time interval (in ms) during which addLayers works before pausing to let the rest of the page process
    chunkDelay: 50,//load marker delay
    chunkProgress: null,//Callback function that is called at the end of each chunkInterval.
    polygonOptions: {}//Options to pass when creating the L.Polygon(points, options) to show the bounds of a cluster.
}
export const defaultClassicOpt = {
    draw: 'intensity',
    max: 100, // 最大阈值
    min: 0, // 最小阈值
    _gradient: [
        {val: 0, color: "#2288ff"},
        {val: 0.6, color: "#22ffbb"},
        {val: 0.7, color: "#99ff66"},
        {val: 0.8, color: "#ffff22"},
        {val: 1.0, color: "#ff5522"},
    ]
};
export const defaultSymbolOpt = {
    draw: 'bubble',
    fillStyle: 'rgba(244, 80, 80,0.8)', // 填充颜色
    strokeStyle: 'rgba(0, 0, 0 , 0)', // 描边颜色
    shadowColor: 'rgba(255, 255, 255, 0)', // 投影颜色
    lineWidth: 1,
    shadowBlur: 1,  // 投影模糊级数
    max: 100, // 数值最大值范围
    maxSize: 10, // 显示的圆最大半径大小
};
export const basicClassicOpt = {
    valueProperty: 'incidents', // which property in the features to use
    scale: ['#22bbff', '#ff22bb'], // chroma.js scale - include as many as you like
    _scale: [{color: '#22bbff'}, {color: '#ff22bb'}],
    steps: 5, // number of breaks or steps in range
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: {
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.8
    }
};
export const defaultTimeOpt = {
    fillStyle: 'rgba(255, 250, 250, 0.5)',
    zIndex: 200,
    size: 2.5,
    animation: {
        type: 'time',
        stepsRange: {
            start: 0,
            end: 50
        },
        trails: 10,
        duration: 2,
    },
    draw: 'simple'
};
export const defaultLineOpt = {
    strokeStyle: 'rgba(255, 250, 50, 0.8)',
    shadowColor: 'rgba(255, 250, 50, 1)',
    shadowBlur: 20,
    lineWidth: 2,
    zIndex: 100,
    draw: 'simple'
};
export const defaultTextOpt = {
    draw: 'text',
    font: '14px Arial',
    fillStyle: '#fff',
    shadowColor: '#ff0',
    zIndex: 11,
    shadowBlur: 10
};
export const defaultPointOpt = {
    fillStyle: 'rgba(254,175,3,0.7)',
    shadowColor: 'rgba(55, 50, 250, 0.5)',
    shadowBlur: 10,
    size: 5,
    zIndex: 10,
    draw: 'simple'
};
export const defaultStrengthOpt = {
    strokeStyle: 'rgba(50, 50, 255, 0.8)',
    lineWidth: 0.5,
    shadowColor: 'rgba(55, 50, 250, 0.5)',
    shadowBlur: 20,
    globalCompositeOperation: 'lighter',
    draw: 'simple'
};
