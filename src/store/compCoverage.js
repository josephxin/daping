export default {
    state: {
        isMouseDown: false,
        position: '',
        mouseDownPosiY: 0,
        mouseDownPosiX: 0,
        mouseMovePosiY: 0,
        mouseMovePosiX: 0
    },
    mutations: {
        mouseDown(state, mouseInfo) {
            state.isMouseDown = true;
            state.mouseDownPosiX = mouseInfo.mouseDownPosiX;
            state.mouseDownPosiY = mouseInfo.mouseDownPosiY;
            state.mouseMovePosiY = mouseInfo.mouseDownPosiY;
            state.mouseMovePosiX = mouseInfo.mouseDownPosiX;
            state.position = mouseInfo.position;
        },
        mouseUp(state) {
            state.isMouseDown = false;
        },
        mouseMove(state, mouseInfo) {
            state.mouseMovePosiY = mouseInfo.mouseMovePosiY;
            state.mouseMovePosiX = mouseInfo.mouseMovePosiX;
        }
    },
    getters: {
        verticalOffset(state) {
            return state.mouseMovePosiY - state.mouseDownPosiY;
        },
        horizontalOffset(state) {
            return state.mouseMovePosiX - state.mouseDownPosiX;
        },
        position(state) {
            return state.position;
        }
    },
    actions: {}
}
