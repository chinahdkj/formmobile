<template>
    <div class="ftm_iframe_box" style="width:100%">
        <iframe class="ftm_iframe" v-if="url" frameborder="0" :src="targetUrl" :data-formrender_token="FORMRENDER_TOKEN"
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
    props: ["field", "model", "disabled", "url", "iframeWidth", "iframeHeight", "vars"],
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
            return TransferUrl(this.url, this.model, this.vars)
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
