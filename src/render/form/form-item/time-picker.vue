<template>
    <!--    <el-time-picker v-model="value" :disabled="!!disabled" :readonly="!!readonly"
                        :editable="!!editable" :clearable="!!clearable"
                        :arrowControl="!!arrowControl" :format="format" :valueFormat="valueFormat"
                        v-bind="$attrs"></el-time-picker>-->
    <mue-date-picker v-model="value" :format="fmt" :clearable="!required && !!clearable" :disabled="!!disabled"
                     v-bind="$attrs"/>
</template>

<script>
import {GetFormatString} from "../../../utils/lib";

export default {
    name: "FtmTimePicker",
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "required", "disabled", "defaultValue",
        "readonly", "editable", "clearable", "arrowControl", "format", "valueFormat"],
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
        },
        fmt() {
            return GetFormatString(this.format);
        },
    },
    watch: {},
    methods: {}
}
</script>
