<template>
    <mue-date-range-picker v-model="value" :disabled="!!disabled" :clearable="!!clearable"
                           :format="fmt" v-bind="$attrs" :begin.sync="begin" :end.sync="end"></mue-date-range-picker>
</template>

<script>
import {GetFormatString} from "../../../utils/lib";
export default {
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "required", "disabled", "defaultValue",
        "readonly", "editable", "clearable", "dataType", "format", "valueFormat"],
    data() {
        return {
            begin: "",
            end: ""
        };
    },
    computed: {
        value: {
            get() {
                let v = this.model[this.field]
                return this.transValue(v);
            },
            set(nv) {
                return this.commitValue(nv)
            }
        },
        fmt() {
            return GetFormatString(this.format);
        }
    },
    methods: {
        transValue(v){
            if(!v) return null;
            return Array.isArray(v) ? v.join(",") : v;
        },
        commitValue(v){
            if(!v){
                this.$set(this.model, this.field, null);
                return;
            }
            if(this.dataType === "String") {
                this.$set(this.model, this.field, v);
            } else {
                this.$set(this.model, this.field, v.split(","));
            }
        },
    }
}
</script>

<style lang="less">
.fpt__date-range-picker {

}
</style>
