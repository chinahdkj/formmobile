<template>
    <van-rate v-model="value" color="#ffd21e" :readonly="!!disabled" :allow-half="!!allowHalf" v-bind="$attrs"/>
</template>

<script>
    export default {
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "disabled", "defaultValue", "allowHalf"],
        data() {
            return {};
        },
        computed: {
            value: {
                get() {
                    return this.model[this.field];
                },
                set(nv) {
                    this.$set(this.model, this.field, nv);
                }
            }
        },
        watch: {
            /*defaultValue: {
                immediate: true, handler(v) {
                    if (v == null || v == undefined) {
                        return
                    }
                    this.value = v
                }
            }*/
        },
        methods: {}
    }
</script>

<style lang="less">
.fpt__rate {
    .van-rate {
        margin: 5px 0;
    }
}
</style>
