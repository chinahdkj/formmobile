<template>
    <div class="dsp__video">
        <mue-img-upload v-model="files" :multiple="!!multiple" readonly></mue-img-upload>
    </div>
</template>

<script>
import {strToArr} from '../../../../utils/lib'

export default {
    name: "DspVideo",
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
        }
    }
}
</script>

<style lang="less">
.dsp__video {
    width: 100%;
    box-sizing: border-box;
}
</style>
