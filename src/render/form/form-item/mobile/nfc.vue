<template>
    <mue-input placeholder="请贴近设备" v-model="value" type="text"
               :disabled="!!disabled"/>
</template>

<script>
    export default {
        name: "FtmNfc",
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "required", "disabled", "defaultValue", "afterRead"],
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
        },
        mounted() {
            window.response2({
                    method: "nfcData",
                    cb: (res) => {
                        if(res.tag) {
                            this.value = res.tag;
                            if(this.afterRead) {
                                try {
                                    let value = res.tag;
                                    let _this = this;
                                    let $post = this.$server._Post
                                    let $get = this.$server._Get
                                    eval(this.afterRead)
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        }
                    }
                }
            )
        }
    }
</script>
