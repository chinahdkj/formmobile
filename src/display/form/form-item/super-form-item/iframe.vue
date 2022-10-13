<template>
    <div class="dsp__iframe">
        <iframe class="ftm_iframe" v-if="url" frameborder="0" :src="targetUrl" :data-formrender_token="FORMRENDER_TOKEN"
                :style="{width: iframeWidth ? iframeWidth : '100%', height: iframeHeight ? iframeHeight : '300px'}"/>
<!--        <div class="shandow is-disabled"></div>-->
    </div>
</template>

<script>
import PostMessage from "../../../../utils/postMessage"
import {TransferUrl} from '../../../../utils/lib'

export default {
    mixins: [PostMessage],
    name: "DspIframe",
    inheritAttrs: false,
    components: {},
    props: ["value", "url", "iframeWidth", "iframeHeight", "model", "field", "vars"],
    data() {
        return {};
    },
    computed: {
        targetUrl() {
            return TransferUrl(this.url, this.model, this.vars)
        },
        FORMRENDER_TOKEN(){
            return sessionStorage.getItem('authortoken') || ''
        },
    },
    watch: {
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
    }
}
</script>

<style lang="less" scoped>
.dsp__iframe {
    width: 100%;
    position: relative;
    padding: 0;
    .shandow {
        display: none;
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        z-index: 5;
        &.is-disabled {
            display: block;
        }
    }
}
</style>