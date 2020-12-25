<template>
    <div>
        <img
            :style="style"
            :src="imageUrl"
            class="customInamge"
            @click="clickImg"
        />
    </div>
</template>
<script>
import AbstractComp from "@/compLib/commons/AbstractComp.js";
import util from "@/util/util";
export default {
    name: "CustomImage",
    mixins: [AbstractComp],
    computed: {
        imageUrl() {
            return this.styleConf.imageUrl
                ? this.styleConf.imageUrl
                : "/img/default.png";
        },
        style() {
            let style = {
                width: this.box.width + "px",
                height: this.box.height + "px",
                opacity: this.styleConf.opacity,
                cursor: this.styleConf.showLink ? "pointer" : "default",
            };
            if (this.styleConf.animationShow) {
                (style.animationName = this.styleConf.animationName),
                    (style.animationDuration =
                        this.styleConf.animationDuration + "s"),
                    (style.animationTimingFunction = this.styleConf.animationTimingFunction);
                style.animationIterationCount =
                    this.styleConf.animationIterationCount === 0
                        ? "infinite"
                        : this.styleConf.animationIterationCount;
                style.animationDirection = this.styleConf.animationDirection
                    ? "alternate"
                    : "normal";
            }
            return style;
        },
    },
    methods: {
        clickImg() {
            if (this.styleConf.showLink) {
                let link = this.styleConf.link;
                //console.log("clickImg -> link", link);
                if (!link) {
                    this.$message.info("没有配置链接地址！");
                    return;
                }
                if (this.styleConf.target == "_blank") {
                    window.open(link);
                } else {
                    window.location.href = link;
                }
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.customInamge {
    display: block;
    width: 100%;
    height: 100%;
    /* &:hover {
        opacity: 0.8;
    } */
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes scale {
    0%,
    50%,
    100% {
        transform: scale(1);
    }
    25%,
    75% {
        transform: scale(1.1);
    }
}
@keyframes left {
    0%,
    50%,
    100% {
        transform: translateX(0);
    }
    25%,
    75% {
        transform: translateX(-20px);
    }
}
@keyframes right {
    0%,
    50%,
    100% {
        transform: translateX(0);
    }
    25%,
    75% {
        transform: translateX(20px);
    }
}
@keyframes top {
    0%,
    50%,
    100% {
        transform: translateX(0);
    }
    25%,
    75% {
        transform: translateY(-20px);
    }
}
@keyframes bottom {
    0%,
    50%,
    100% {
        transform: translateX(0);
    }
    25%,
    75% {
        transform: translateY(20px);
    }
}
</style>
