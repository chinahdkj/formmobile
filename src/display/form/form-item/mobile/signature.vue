<template>
    <div class="dsp__signature">
        <mue-signature v-model="imgs" readonly></mue-signature>
    </div>
</template>

<script>
    import {strToArr} from '../../../../utils/lib'

    export default {
        name: "DspSignature",
        components: {},
        props: ["value"],
        data(){
            return {};
        },
        computed: {
            imgs: {
                get() {
                    if(Array.isArray(this.value)) return this.value;
                    return strToArr(this.value)
                },
                set() {

                }
            }
        },
        methods: {}
    }
</script>

<style lang="less">
    .dsp__signature {
        width: 100%;
        box-sizing: border-box;
    }
</style>
