<template>
<!--    <el-input readonly v-model="value" :disabled="!!disabled"
              :suffix-icon="error ? 'el-icon-warning-outline' : ''" v-bind="$attrs"></el-input>-->
    <mue-input v-model="value" readonly :icon="error ? 'icon-yichang-weixuan' : ''"
               :disabled="!!disabled" v-bind="$attrs">
    </mue-input>
</template>

<script>
    export default {
        name: "FtmExpression",
        inheritAttrs: false,
        components: {},
        props: [
            "field", "model", "disabled", "expression"
        ],
        data() {
            return {
                value: null, error: false
            };
        },
        computed: {},
        watch: {
            model: {
                immediate: true, deep: true,
                handler(){
                    // 判断 ${field}
                    if(!/\$\{\S+\}/.test(this.expression)){
                        this.value = this.expression;
                        this.$set(this.model, this.field, this.value);
                        return;
                    }

                    try{
                        let vars = {...this.model};

                        if(/return\s+/.test(this.expression)){
                            let es = this.expression.replace(/\$\{(\S+)\}/g, `vars["$1"]`);
                            this.value = eval(`(function(){
                                ${es};
                            })()`);
                        }
                        if(!this.value && (this.value !== "" && this.value !== 0)){
                            this.value = null;
                        }
                        this.$set(this.model, this.field, this.value);
                        this.error = false;

                    } catch(e){
                        this.value = null;
                        this.$set(this.model, this.field, null);
                        this.error = true;
                    }
                }
            }
        },
        methods: {}
    }
</script>
