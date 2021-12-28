<template>
    <div class="dsp__color-picker">
        {{value}}
    </div>
</template>

<script>
    export default {
        name: "DspColorPicker",
        inheritAttrs: false,
        components: {},
        props: ["value"],
        data() {
            return {};
        },
        computed: {},
    }
</script>

<style lang="less">
    .dsp__color-picker {
        .el-color-picker__mask {
            display: none;
        }
    }
</style>
