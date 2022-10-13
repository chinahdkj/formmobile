<template>
    <div class="dsp__img-video">
        <mue-img-upload v-model="files" :multiple="!!multiple" accept="all" readonly
                        ></mue-img-upload>
    </div>
</template>

<script>
import {strToArr} from '../../../../utils/lib'

export default {
    name: "DspImgVideo",
    components: {},
    props: ["value", "multiple"],
    data() {
        return {};
    },
    computed: {
        files: {
            get() {
                if(Array.isArray(this.value)) return this.value;
                return strToArr(this.value)
            },
            set() {

            }
        },
        FORMRENDER_TOKEN(){
            return sessionStorage.getItem('authortoken') || ''
        },
    }
}
</script>

<style lang="less">
    .dsp__img-video {
        width: 100%;
        box-sizing: border-box;
    }
</style>
