<template>
    <van-slider v-model="value" :disabled="!!disabled" v-bind="$attrs" />
</template>

<script>
    export default {
        name: "FtmSlider",
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "disabled", "defaultValue", "range"],
        data(){
            return {};
        },
        computed: {
            value: {
                get(){
                    return this.model[this.field];
                },
                set(nv){
                    this.$set(this.model, this.field, nv);
                }
            }
        },
        watch: {
        },
        methods: {}
    }
</script>

<style lang="less">
.fpt__slider {
    .van-slider {
        margin: 13px 0;
    }
}
</style>
