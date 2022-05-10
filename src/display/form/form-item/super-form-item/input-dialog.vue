<template>
    <div class="dsp__input-dialog normal-value">{{text}}</div>
</template>

<script>
    export default {
        name: "DspInputDialog",
        inheritAttrs: false,
        components: {},
        props: ["value", "field", "model"],
        data(){
            return {};
        },
        computed: {
            text() {
                return this.model[`${this.field}$$text`] || this.value || "";
            }
        },
    }
</script>

<style lang="less" scoped>
</style>