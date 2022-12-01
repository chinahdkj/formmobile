<template>
    <div style="width:100%">
        <!-- <van-button :style="btnStyle" size="small" :disabled="!!disabled" native-type="button"
                   @click="dialog.visible = true">{{ btnName }}</van-button> -->
        <div class="mue-select">
            <div class="mue-form-input has-suffix" @click="openPopup"
                :class="{'mue-form-input__is-disabled': !!disabled && !displayReadonly}">
                <input type="text" class="input__inner" readonly :value="btnName" :disabled="!!disabled && !displayReadonly"
                    :placeholder="btnName" onfocus="this.blur()"/>
                <slot name="icon">
                    <i class="input__suffix input__suffix_icon iconfont icon-arrows-copy-copy"></i>
                </slot>
            </div>
        </div>
        <van-popup v-model="dialog.visible" get-container="body" :close-on-click-overlay="true"
            :class="dialogClass ? `form-custom-dialog ${dialogClass} ` : 'form-custom-dialog '"
            position="right" style="width:90%;height:100%;">
            <div class="form-custom-dialog-header">{{dialogTitle || btnName}}</div>
            <div class="form-custom-dialog-container">
                <iframe v-if="(mobileUrl || url) && dialog.visible" frameborder="0" :src="targetUrl" :data-formrender_token="FORMRENDER_TOKEN"
                    :style="{width: '100%', height: '100%'}"/>
            </div>
            <!-- <div class="form-custom-dialog-footer">
                <van-button size="large" type="default" @click="dialog.visible = false">取消</van-button>
                <van-button size="large" type="primary" >确定</van-button>
            </div> -->
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
    props: ["field", "model", "disabled", "btnName", "url", "mobileUrl", "fullscreen", "dialogWidth", "dialogHeight",
        "dialogClass", "dialogTitle", "btnWidth", "rowIndex", "vars", "displayReadonly"],
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
            let appid = sessionStorage.getItem('appid')
            let token = sessionStorage.getItem('authortoken')
            let app = sessionStorage.getItem('authorapp')
            let host = sessionStorage.getItem('host')
            const app_sn = sessionStorage.getItem('app_sn') ? `${sessionStorage.getItem('app_sn')}` : '';
            let pp = ''
            if(app_sn){
                if(location.href.indexOf(`/${app_sn}/`) > -1){
                    pp = location.href.split(`/${app_sn}/`)[0] + `/${app_sn}/hddev`
                }else if(location.href.indexOf('/hddev/') > -1){
                    pp = location.href.split('/hddev/')[0] + '/hddev'
                }else{
                    pp = location.origin
                }
            }else if(location.href.indexOf('/hddev/') > -1){
                pp = location.href.split('/hddev/')[0] + '/hddev'
            }else{
                pp = location.origin
            }
            if(location.pathname.startsWith('/static/apps/') && location.origin.startsWith('http')){
                const patharr = location.pathname.split('/')
                pp = `${location.origin}/${patharr[1]}/${patharr[2]}/${patharr[3]}`
            }
            let url = TransferUrl(this.mobileUrl || this.url, this.model, this.vars)
            //子表链接自动携带上rowIndex
            if(this.rowIndex !== undefined) {
                url = (url || "").includes("?") ? `${url}&rowIndex=${this.rowIndex}` : `${url}?rowIndex=${this.rowIndex}`
            }
            console.log({pp,url,param:$.param({appid,token,app,host})})
            if(!url.startsWith('http') && !url.startsWith('file')){
                return url.startsWith('/') ? `${pp}${url}` : `${pp}/${url}`
            }else{
                return url + '&' + $.param({appid,token,app,host})
            }
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
        },
        //子表专用新增数据
        pushPostMessageModel: {
            deep: true, immediate: true, handler(v, ov) {
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
        openPopup(){
            if(!!this.disabled && !this.displayReadonly) return
            this.dialog.visible = true
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
    }
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
        .form-custom-dialog-container{
            height: calc(100% - 32px);
        }
        .form-custom-dialog-footer{
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
    }
</style>
<style lang="less">
body .mue-form .custom-form-group-grids .mue-form-item:not(.default-dialog-btn) ,
body .sub-form-view .form-part .mue-panel .mue-form-item:not(.default-dialog-btn) {
    &.fpt__dialog {
        margin-top: -41px;
        top:0;
        opacity: 0;
    }
}
</style>