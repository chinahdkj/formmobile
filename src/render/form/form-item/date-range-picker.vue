<template>
    <van-tag>移动端暂不支持时间区间选择</van-tag>
</template>

<script>
export default {
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "required", "disabled", "defaultValue",
        "readonly", "editable", "clearable", "dateType", "format", "valueFormat"],
    data() {
        return {};
    },
    computed: {},
    methods: {}
}
</script>

<style lang="less">
.fpt__date-range-picker {
    .van-tag {
        margin: 5px 0;
    }
}
</style>
