<template>
    <div style="width:100%">
        <!-- <van-button :style="btnStyle" size="small" :disabled="true" native-type="button">{{ btnName }}</van-button> -->
        <div class="mue-select">
            <div class="mue-form-input has-suffix"
                :class="{'mue-form-input__is-disabled': !!disabled}">
                <input type="text" class="input__inner" readonly :value="btnName" :disabled="!!disabled"
                    :placeholder="btnName" onfocus="this.blur()"/>
                <slot name="icon">
                    <i class="input__suffix input__suffix_icon iconfont icon-arrows-copy-copy"></i>
                </slot>
            </div>
        </div>        
    </div>
</template>

<script>
import PostMessage from "../../../../utils/postMessage"
import {TransferUrl} from '../../../../utils/lib'
export default {
    mixins: [PostMessage],
    name: "DspDialog",
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "disabled", "btnName", "url", "fullscreen", "dialogWidth", "dialogHeight",
        "dialogClass", "dialogTitle", "btnWidth"],
    data() {
        return {
            dialog: {
                visible: false
            },
            postMessageModel: {}
        };
    },
    computed: {
        value: {
            get() {
                return this.model[this.field];
            },
            set(nv) {
                this.$set(this.model, this.field, nv);
            }
        },
        targetUrl() {
            return TransferUrl(this.url, this.model)
        },
        btnStyle() {
            return this.btnWidth ? {width: this.btnWidth} : {}
        }
    },
    watch: {
        postMessageModel: {
            deep: true, immediate: true, handler(v) {
                if(!Object.keys(v).length) {
                    return
                }
                for(let [key, value] of Object.entries(v)) {
                    if(key in this.model) this.$set(this.model, key, value);
                }
            }
        }
    },
    methods: {}
}
</script>

<style lang="less" scoped>
    .form-custom-dialog{
        &.fullscreen{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 0;
        }
        .form-custom-dialog-header{
            height: 40px;
            line-height: 40px;
            padding: 0 12px;
            position: relative;
            padding-right: 40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .form-custom-dialog-header-close{
                position: absolute;
                top: 0;
                right: 0;
                width: 40px;
                height: 40px;
                text-align: center;
                line-height: 42px;
            }
        }
        .form-custom-dialog-container{
            height: calc(100% - 40px);
        }
    }
</style>
<style lang="less">
body .mue-form .custom-form-group-grids .dsp-form-item ,
body .sub-form-view .form-part .mue-panel .dsp-form-item {
    &.dsp-form-item__dialog {
        margin-top: -41px;
        opacity: 0;
    }
}
</style>
