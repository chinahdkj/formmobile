<template>
    <div class="dsp__pictrue">
        <mue-img-upload v-model="files" :multiple="!!multiple" :base64="!!base64" readonly
                        ></mue-img-upload>
    </div>
</template>

<script>
import {strToArr} from '../../../../utils/lib'

export default {
    name: "DspPicture",
    components: {},
    props: ["value", "multiple","base64"],
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
    .dsp__pictrue {
        width: 100%;
        box-sizing: border-box;
    }
</style>
