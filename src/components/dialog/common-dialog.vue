<template>
  <el-dialog class="common-dialog common-dialog2" :visible.sync="visible" :width="width" :close-on-click-modal="closeOnClickModal"
    :fullscreen="fullscreen" :top="top" :modal-append-to-body="modalAppendToBody" :append-to-body="appendToBody"
    :lock-scroll="lockScroll" :custom-class="customClass" :close-on-press-escape="closeOnPressEscape"
    :beforeClose="beforeClose" :center="center" :destroy-on-close="destroyOnClose" :show-close="showClose">
    <p slot="title" class="dialog-title">
      <img v-if="titleImgShow" class="dialog-title-icon" :src="titleImgUrl" align="left" height="16" width="16" />
      {{ title }}
    </p>
    <slot name="dialog-content"></slot>
    <slot name="dialog-footer" slot="footer"></slot>
  </el-dialog>
</template>

<script>
export default {
  name: "common-dialog",
  props: {
    width: {
      type: String,
      default: "50%",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    titleImgShow: {
      type: Boolean,
      default: true,
    },
    titleImgUrl: {
      type: String,
      default: () => {
        return require("@/assets/image/icon_033.png");
      },
    },
    title: {
      type: String,
      default: "",
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    top: {
      type: String,
      default: "15vh",
    },
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      default: "",
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    beforeClose: {
      type: Function,
      default: () => {
        return null;
      },
    },
  },
};
</script>

<style scoped lang="stylus">
.dialog-title {
  user-select: none
}
</style>
<style lang="stylus">
.common-dialog2 {
  .el-table__empty-block {
    background-color: #fff
  }

  .el-dialog {
    display: flex
    flex-direction: column
    margin: 0 !important
    position: absolute
    border-radius: 5px !important
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    /* height:600px; */
    max-height: calc(100% - 30px)
    max-width: calc(100% - 30px)
  }

  .el-dialog .el-dialog__body {
    flex: 1
    overflow: auto
  }

  .el-dialog__header {
    border-bottom: 2px solid #5abdff !important
    padding: 10px 20px 10px 15px !important
  }

  .el-dialog__body {
    padding: 10px !important
  }

  .el-dialog__footer {
    padding-right: 10px
  }

  .el-dialog__header .dialog-title {
    font-family: 'Microsoft YaHei'
    font-size: 14px
    color: #37414c
    font-weight: bold
    margin: 5px
  }

  .el-dialog__header .dialog-title .dialog-title-icon {
    margin-right: 10px
    margin-top: 2px
  }

  .el-input__inner {
    height: 36px !important
    line-height: 36px !important
  }

  .el-radio {
    color: #37414c
  }

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #2172c8
    background: #fff
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #37414c
  }

  .el-radio__inner:hover {
    border-color: #2172c8
  }

  .el-radio__inner::after {
    background-color: #2172c8
    width: 8px
    height: 8px
  }

  .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
    -webkit-box-shadow: 0 0 2px 2px #2172c8
    box-shadow: 0 0 2px 2px #2172c8
  }

  .el-table__header {
    border-bottom: 2px solid #b5cce6 !important
    border-top: 2px solid #a0d6ff !important
  }

  .el-table__header .has-gutter th {
    border-right: none
    height: 40px !important
    padding: 6px 0
  }

  .el-table__header-wrapper .el-table__header .has-gutter tr th .cell {
    font-family: MicrosoftYaHei
    font-size: 14px
    font-weight: normal
    font-stretch: normal
    color: #37414c
    letter-spacing: 0px
    height: 24px
    line-height: 20px
    padding: 2px 4px
  }

  .el-table__body-wrapper {
    .el-table__body {
      .el-table__row {
        background: #ffffff

        td {
          height: 40px !important
          line-height: 36px !important
          padding: 2px 4px

          .cell {
            padding: 0 2px

            .el-input__inner {
              height: 32px !important
              line-height: 32px !important
            }

            .el-input__inner[type='number'] {
              padding: 0 0 0 5px
            }

            .el-input__suffix {
              .el-icon-arrow-up {
                line-height: 28px !important
              }

              .el-input__suffix-inner {
                .el-input__icon {
                  line-height: 28px !important
                }
              }
            }

            .el-input__prefix {
              .el-icon-time {
                line-height: 28px !important
              }
            }
          }
        }
      }
    }
  }

  .el-pagination {
    .el-input__inner {
      height: 28px !important
      line-height: 28px !important
    }
  }

  .el-input__inner:hover {
    border-color: #74abff
  }

  .el-input__inner:active {
    border-color: #74abff
  }

  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #74abff
    outline: 0
  }

  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #74abff
  }
}
</style>
