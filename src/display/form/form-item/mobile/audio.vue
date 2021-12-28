<template>
    <div class="dsp__audio">
        <mue-sound-record v-model="files" :multiple="!!multiple" readonly></mue-sound-record>
    </div>
</template>

<script>
import {strToArr} from '../../../../utils/lib'

export default {
    name: "DspAudio",
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
.dsp__audio {
    width: 100%;
    box-sizing: border-box;
}
</style>
