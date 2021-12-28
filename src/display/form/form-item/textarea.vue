<template>
    <div class="dsp__textarea">
        <pre v-html="value" ref="text"></pre>
    </div>
</template>

<script>
    export default {
        name: "DspTextarea",
        inheritAttrs: false,
        components: {},
        props: ["value"],
        data(){
            return {};
        },
    }
</script>

<style lang="less" scoped>
    .dsp__textarea {
        > pre {
            white-space: break-spaces;
            font-family: 'Microsoft YaHei';
        }
    }
</style>
