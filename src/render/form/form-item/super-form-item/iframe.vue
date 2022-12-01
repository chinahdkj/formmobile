<template>
    <div class="ftm_iframe_box" style="width:100%">
        <iframe class="ftm_iframe" v-if="mobileUrl || url" frameborder="0" :src="targetUrl" :data-formrender_token="FORMRENDER_TOKEN"
                :style="{width: iframeWidth ? iframeWidth : '100%', height: iframeHeight ? iframeHeight : '300px'}"/>
        <div class="shandow" :class="{'is-disabled': !!disabled}"></div>
    </div>
</template>

<script>
import PostMessage from "../../../../utils/postMessage"
import {TransferUrl} from '../../../../utils/lib'

export default {
    mixins: [PostMessage],
    name: "FtmIframe",
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "disabled", "url", "mobileUrl", "iframeWidth", "iframeHeight", "vars"],
    data() {
        return {
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
        FORMRENDER_TOKEN(){
            return sessionStorage.getItem('authortoken') || ''
        },
        targetUrl() {
            // return TransferUrl(this.mobileUrl || this.url, this.model, this.vars)
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
            url = (url || "").includes("?") ? `${url}&_t=` : `${url}?_t=`
            console.log({pp,url,param:$.param({appid,token,app,host})})
            if(!url.startsWith('http') && !url.startsWith('file')){
                return url.startsWith('/') ? `${pp}${url}` : `${pp}/${url}`
            }else{
                return url + '&' + $.param({appid,token,app,host})
            }
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
        value: {
            deep: true, immediate: true, handler(v, ov) {
                if(JSON.stringify(v) === JSON.stringify(ov)) {
                    return
                }
                this.$nextTick(() => {
                    let iframeWindow = this.$el.querySelector(".ftm_iframe") ?
                        this.$el.querySelector(".ftm_iframe").contentWindow : null;
                    if(iframeWindow)
                        iframeWindow.postMessage({action:"FRD-VALUE-CHANGE", params: v}, '*')
                })
            }
        }
    },
    methods: {}
}
</script>

<style lang="less" scoped>
    .ftm_iframe_box {
        position: relative;
        .shandow {
            display: none;
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            z-index: 5;
            background: rgba(255,255,255, 0.5);
            &.is-disabled {
                display: block;
            }
        }
    }
</style>
