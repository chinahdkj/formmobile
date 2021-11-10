<template>
    <van-stepper v-model="value" :disabled="!!disabled" v-bind="$attrs" native-type="button" />
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
        methods: {},
        mounted() {
            //vant 1.x van-stepper的递加和递减按钮type位设置成button，表单中直接使用会提交表单，此问题在2.x中已修复
            this.$nextTick(() => {
                $(".fpt__input-number .van-stepper > button").attr("type", "button")
            })
        }
    }
</script>
