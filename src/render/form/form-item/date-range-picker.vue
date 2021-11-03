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
        "readonly", "editable", "clearable", "dataType", "format", "valueFormat", "isTimestamp"],
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
            if(!this.isTimestamp) {
                return Array.isArray(v) ? v.join(",") : v;
            }
            return this.unixToString(v, this.fmt)
        },
        commitValue(v){
            if(!v){
                this.$set(this.model, this.field, null);
                return;
            }
            if(this.dataType === "String") {
                this.$set(this.model, this.field, this.stringToUnix(v, this.fmt));
            } else {
                this.$set(this.model, this.field, this.stringToUnix(v, this.fmt).split(","));
            }
        },
        //时间戳转字符串
        unixToString(date, format) {
            if(Array.isArray(date)) {
                let vals = date.map(m => moment.unix(m/1000).format(format));
                return vals.join(",");
            }
            let arr = date.split(",");
            return arr.map(m => moment.unix(Number(m)/1000).format(format)).join(",")
        },
        //字符串转时间戳,最终返回时间戳组成的字符串
        stringToUnix(date, format) {
            let arr = date.split(",");
            return arr.map(m => moment(m, format).unix()*1000).join(",")
        }
    }
}
</script>

<style lang="less">
.fpt__date-range-picker {

}
</style>
