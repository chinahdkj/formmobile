<template>
  <div style="width:100%">
    <!-- <van-button :style="btnStyle" size="small" :disabled="!!disabled" native-type="button"
               @click="dialog.visible = true">{{ btnName }}</van-button> -->
    <div class="mue-select">
      <div class="mue-form-input has-suffix" @click="openPopup"
           :class="{'mue-form-input__is-disabled': !displayReadonly}">
        {{btnName}}
        <slot name="icon">
          <i class="input__suffix input__suffix_icon iconfont icon-202"></i>
        </slot>
      </div>
    </div>
    <van-popup v-model="dialog.visible" get-container="body" :close-on-click-overlay="true"
               :class="dialogClass ? `form-custom-dialog ${dialogClass} ` : 'form-custom-dialog '"
               position="right" style="width:90%;height:100%;">
      <div class="form-custom-dialog-header">{{dialogTitle || btnName}}</div>
      <div class="form-custom-dialog-container">
        <iframe v-if="url && dialog.visible" frameborder="0" :src="targetUrl" :data-formrender_token="FORMRENDER_TOKEN"
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
    name: "DspDialog",
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
            if(!!this.displayReadonly) {
              url = (url || "").includes("?") ? `${url}&isDetail=1` : `${trans_url}?isDetail=1`
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
                if(!Object.keys(v).length) {
                    return
                }
                for(let [key, value] of Object.entries(v)) {
                    if(key in this.model) this.$set(this.model, key, value);
                }
            }
        }
    },
    methods: {
        openPopup(){
            if(!this.displayReadonly) return
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
.mue-select{
    .mue-form-input{
        border: none;
        padding: 0;
        height: 30px;
    }
}
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
body .form-display .custom-form-group-grids .dsp-form-item:not(.default-dialog-btn) ,
body .sub-form-view .form-part .mue-panel .dsp-form-item:not(.default-dialog-btn) {
    &.dsp-form-item__dialog {
        margin-top: -41px;
        top:0;
        opacity: 0;
    }
}
</style>
