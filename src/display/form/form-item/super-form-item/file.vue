<template>
    <div class="dsp__file" :class="{'single': files.length === 1}">
        <mue-upload v-model="files" :multiple="!!multiple" readonly isFrame></mue-upload>
    </div>
</template>

<script>
import {strToArr} from '../../../../utils/lib'

export default {
    name: "DspFile",
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
.dsp__file {
    width: 100%;
    box-sizing: border-box;

    &.single {
        .mue-upload ul.mue-upload-list > li.__upload-file {
            margin-bottom: 0;
        }
    }
}
</style>
