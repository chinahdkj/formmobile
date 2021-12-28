<template>
    <van-tag>移动端暂不支持颜色选择器</van-tag>
</template>

<script>
    export default {
        name: "FtmColorPicker",
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "disabled", "defaultValue"],
        data() {
            return {};
        }
    }
</script>

<style lang="less">
.fpt__color-picker {
    .van-tag {
        margin: 5px 0;
    }
}
</style>