<template>
    <van-switch v-model="value" :active-value="1" :inactive-value="0" :disabled="!!disabled"/>
</template>

<script>
    export default {
        components: {},
        props: ["field", "model", "required", "disabled", "defaultValue", "dataType"],
        data(){
            return {};
        },
        computed: {
            value: {
                get(){
                    let v = this.model[this.field] || 0;
                    return Number(JSON.parse(v)  || 0);
                },
                set(nv){
                    this.$set(this.model, this.field, this.dataType === "Number" ? nv : String(nv));
                }
            }
        }
    }
</script>
