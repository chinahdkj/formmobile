<template>
    <van-tag>移动端暂不支持级联选择器</van-tag>
</template>

<script>
    export default {
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "dataType", "readonly", "disabled", "defaultValue","clearable", "multiple","bindings","placeholder"],
        data(){
            return {};
        }
    }
</script>

<style lang="less">
.fpt__cascader {
    .van-tag {
        margin: 5px 0;
    }
}
</style>
