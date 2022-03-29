<template>
    <div style="width:100%">
        <van-button :style="btnStyle" size="small" :disabled="!!disabled" native-type="button"
                   @click="dialog.visible = true">{{ btnName }}</van-button>

        <van-popup v-model="dialog.visible" get-container="#app" :close-on-click-overlay="false"
            :class="(dialogClass ? `form-custom-dialog ${dialogClass} ` : 'form-custom-dialog ' ) + (!!fullscreen ? 'fullscreen' : '')"
            :style="{width:!!fullscreen ? '100%' : (dialogWidth ? dialogWidth : '50%')}">
            <div class="form-custom-dialog-header">{{dialogTitle || btnName}}
                <div class="form-custom-dialog-header-close" @click="dialog.visible = false">
                    <van-icon name="cross" />
                </div>
            </div>
            <div class="form-custom-dialog-container">
                <iframe v-if="url && dialog.visible" frameborder="0" :src="targetUrl"
                    :style="{width: '100%', height: !!fullscreen ? '100%' : (dialogHeight ? dialogHeight : '100%')}"/>
            </div>
        </van-popup>
    </div>
</template>

<script>
import PostMessage from "../../../../utils/postMessage"
import {TransferUrl} from '../../../../utils/lib'
export default {
    mixins: [PostMessage],
    name: "FtmDialog",
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
