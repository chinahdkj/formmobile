<template>
    <mue-input placeholder="扫描条纹码" v-model="value" type="text" icon="iconfont icon-saoyisao"
               :disabled="!!disabled" @icon-click="scanCode"/>
</template>

<script>
    export default {
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "required", "disabled", "defaultValue"],
        data() {
            return {};
        },
        computed: {
            value: {
                get(){
                    return this.model[this.field];
                },
                set(nv){
                    this.commitValue(nv);
                }
            },
        },
        methods: {
            commitValue(v){
                this.$set(this.model, this.field, String(v || "").trim());
            },
            scanCode(){
                this.$native.scanCode({
                    cb: ({code}) => {
                        this.commitValue(code);
                    }
                });
            }
        }
    }
</script>
