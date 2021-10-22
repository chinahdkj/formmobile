<template>
    <van-stepper v-model="value" :disabled="!!disabled" v-bind="$attrs" />
</template>

<script>
    export default {
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "required", "disabled", "defaultValue"],
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
            /*defaultValue: {
                immediate: true, handler(v) {
                    if(v == null || v == undefined) {
                        return
                    }
                    this.value = v
                }
            }*/
        },
        methods: {}
    }
</script>
