<template>
    <div style="width:100%">
        <!-- <van-button :style="btnStyle" size="small" :disabled="!!disabled" native-type="button"
                   @click="dialog.visible = true">{{ btnName }}</van-button> -->
        <div class="mue-select">
            <div class="mue-form-input has-suffix" @click="openPopup"
                :class="{'mue-form-input__is-disabled': !!disabled}">
                <input type="text" class="input__inner" readonly :value="btnName" :disabled="!!disabled"
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
                <iframe v-if="url && dialog.visible" frameborder="0" :src="targetUrl"
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
        "dialogClass", "dialogTitle", "btnWidth"],
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
        targetUrl() {
            const sn = `/${sessionStorage.getItem('app_sn')}/`
            const pp = path.split(sn)[0] + '/hddev'
            const url = TransferUrl(this.mobileUrl || this.url, this.model)
            const ur = new URL((url.startsWith('/') ? `${pp}${url}` : `${pp}/${url}`))
            ur.searchParams.set('appid',sessionStorage.getItem('appid'))
            ur.searchParams.set('token',sessionStorage.getItem('authortoken'))
            ur.searchParams.set('app',sessionStorage.getItem('authorapp'))
            ur.searchParams.set('host',sessionStorage.getItem('host'))
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
            if(!!this.disabled) return
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
body .mue-form .custom-form-group-grids .mue-form-item ,
body .sub-form-view .form-part .mue-panel .mue-form-item {
    &.fpt__dialog {
        margin-top: -41px;
        top:0;
        opacity: 0;
    }
}
</style>