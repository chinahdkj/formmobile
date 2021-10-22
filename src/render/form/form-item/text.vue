<template>
    <mue-input v-model="value"
               :type="type"
               number-type="float"
               :disabled="!!disabled"
               :readonly="!!readonly"
               v-bind="$attrs">
        <template v-if="unit" slot="suffix">{{unit}}</template>
    </mue-input>
</template>

<script>
    export default {
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "dataType", "readonly", "unit", "disabled"],
        data(){
            return {};
        },
        computed: {
            value: {
                get(){
                    return this.model[this.field];
                },
                set(nv){
                    if (this.type === "number") {
                        let v = nv == null ? "" : String(nv).trim();
                        this.$set(this.model, this.field, !v || isNaN(v) ? 0 : Number(v));
                    } else {
                        this.$set(this.model, this.field, (String(nv) || "").trim());
                    }
                }
            },
            type(){
                return this.dataType ? this.dataType.toLowerCase() : "text";
            }
        },
        methods: {}
    }
</script>
