<template>
    <div class="input-dialog" style="width:100%">
        <mue-input slot="reference" size="mini" readonly :value="text"
                  @click.native="!disabled && (dialog.visible = true)" :placeholder="placeholder"
                  :disabled="!!disabled">
            <i v-if="clearVisible" slot="suffix" @click.stop="onClear"
               class="iconfont icon-chushaixuanxiang" style="cursor: pointer;"></i>
            <template v-if="showIcon">
                <span native-type="button" v-if="btnType === 'icon'" slot="suffix" :disabled="!!disabled" size="mini" type="default" class="text-button">
                    <i class="iconfont" :class="iconBtnMobile || iconBtn"></i>
                </span>
                <span v-if="btnType === 'text'" slot="suffix" :disabled="!!disabled" size="mini" type="default" class="text-button">
                    {{textBtn}}
                </span>
            </template>
        </mue-input>

        <van-popup v-model="dialog.visible" get-container="body" :close-on-click-overlay="true"
            :class="dialogClass ? `form-input-dialog ${dialogClass} ` : 'form-input-dialog '"
            position="right" style="width:90%;height:100%;">
            <div class="form-input-dialog-header">{{dialogTitle || btnName}}</div>
            <div class="form-input-dialog-container">
                <iframe v-if="url && dialog.visible" frameborder="0" :src="targetUrl" :data-formrender_token="FORMRENDER_TOKEN"
                    :style="{width: '100%', height: '100%'}"/>
            </div>
        </van-popup>
    </div>
</template>

<script>
/* 弹框选值器组件- 需要弹框通过 FRD-SET-MODEL 给两个字段赋值（field, field$$text）,并通过FRD-CLOSE-DIALOG关闭弹窗*/
import PostMessage from "../../../../utils/postMessage"
import {TransferUrl, deepClone} from '../../../../utils/lib'

export default {
    mixins: [PostMessage],
    name: "FtmInputDialog",
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "disabled", "btnName", "url", "fullscreen", "dialogWidth", "dialogHeight", "clearable", "mobileUrl", "iconBtnMobile",
        "dialogClass", "dialogTitle", "btnWidth", "placeholder", "showIcon", "btnType", "iconBtn", "textBtn", "rowIndex", "vars"],
    data() {
        return {
            dialog: {
                visible: false
            },
            postMessageModel: {},
            pushPostMessageModel: {}
        };
    },
    computed: {
        text() {
            return this.model[`${this.field}$$text`] || this.value || ""
        },
        clearVisible() {
            return !this.disabled && this.clearable && (this.value || "").length > 0;
        },
        value: {
            get() {
                return this.model[this.field];
            },
            set(nv) {
                this.$set(this.model, this.field, nv);
            }
        },
        FORMRENDER_TOKEN(){
            return sessionStorage.getItem('authortoken') || ''
        },
        targetUrl() {
            const path = location.origin + location.pathname
            const sn = sessionStorage.getItem('app_sn') ? `${sessionStorage.getItem('app_sn')}` : '';
            let pp = path.split(`/${sn}/`)[0]
            pp = pp + (pp.endsWith('/') ? `${sn}/hddev` : `/${sn}/hddev`)
            if(!sn){
                pp = location.origin
            }
            let trans_url = this.mobileUrl || this.url
            let url = TransferUrl(trans_url, this.model, this.vars)
            // url = url.replace("$rowIndex", this.rowIndex)
            //子表链接自动携带上rowIndex
            if(this.rowIndex !== undefined) {
                url = (url || "").includes("?") ? `${url}&rowIndex=${this.rowIndex}` : `${trans_url}?rowIndex=${this.rowIndex}`
            }
            const ur = new URL((url.startsWith('/') ? `${pp}${url}` : `${pp}/${url}`))
            ur.searchParams.set('appid',sessionStorage.getItem('hddevappid') || sessionStorage.getItem('appid'))
            ur.searchParams.set('token',sessionStorage.getItem('authortoken'))
            ur.searchParams.set('app',sessionStorage.getItem('authorapp'))
            sessionStorage.getItem('host') && ur.searchParams.set('host',sessionStorage.getItem('host'))
            return this.checkURL(url) ? url : ur.href
        },
        btnStyle() {
            return this.btnWidth ? {width: this.btnWidth} : {}
        }
    },
    watch: {
        postMessageModel: {
            deep: true, immediate: true, handler(v) {
                if (!Object.keys(v).length) {
                    return
                }
                for (let [key, value] of Object.entries(v)) {
                    if (key in this.model) this.$set(this.model, key, value);
                }
            }
        },
        //子表专用新增数据
        pushPostMessageModel: {
            deep: true, immediate: true, handler(v) {
                if (!Object.keys(v).length) {
                    return
                }
                let model = deepClone(v);
                for (let [key, value] of Object.entries(model)) {
                    if (key in this.model) {
                        if (Array.isArray(value)) {
                            value.forEach(f => {
                                this.model[key].push(f);
                            })
                        }
                    }
                }
            }
        }
    },
    methods: {
        onClear() {
            this.$set(this.model, this.field, "");
            this.$set(this.model, `${this.field}$$text`, "");
        },
        checkURL(URL){
            let str=URL;
            let objExp=new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
            if(objExp.test(str)==true){
                return true;
            }else{
                return false;
            }
        } 
    },
    mounted() {
        this.$set(this.model, `${this.field}$$text`, this.model[`${this.field}$$text`] || "");
    }
}
</script>

<style lang="less" scoped>
    .form-input-dialog{
        &.fullscreen{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 0;
        }
        .form-input-dialog-header{
            height: 32px;
            line-height: 32px;
            padding: 0 12px;
            position: relative;
            font-size: 14px;
            // padding-right: 40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background-color: #f0f0f0;
            color: #757575;
        }
        .form-input-dialog-container{
            height: calc(100% - 32px);
        }
        .form-input-dialog-footer{
            height: 44px;
            padding: 0px;
            position: relative;
            display: flex;
            align-items: center;
            .van-button{
                flex: 1;
                border-radius: 0px;
                margin: 0;
                &.van-button--default{
                    color: #333333;
                }
            }
        }
        .text-button{
            padding: 0;
        }
    }
</style>
