<template>
    <van-tag>移动端暂不支持富文本编辑器</van-tag>
</template>

<script>
    export default {
        name: "FtmEditor",
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "dataType", "readonly", "disabled", "required", "defaultValue"],
        data(){
            return {};
        }
    }
</script>

<style lang="less">
.fpt__editor {
    .van-tag {
        margin: 5px 0;
    }
}
</style>