<template>
<!--    <el-date-picker v-model="value" :disabled="!!disabled" :readonly="!!readonly"
                    :editable="!!editable" :clearable="!!clearable" :type="dateType"
                    :format="format" :value-format="valueFormat" v-bind="$attrs">
    </el-date-picker>-->
    <mue-date-picker v-model="value" :format="fmt" :clearable="!required" :disabled="!!disabled || isDisabled"
                     :min-date="minDate" :max-date="maxDate" v-bind="$attrs" @confirm="onConfirm"/>
</template>

<script>
    import {DateFormat, GetDefaultValue, GetFormatString, needShow, EvalExpression} from '../../../utils/lib'
    import BASE from "./base";
    export default {
        mixins: [BASE],
        name: "FtmDatePicker",
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "required", "disabled", "defaultValue", "vars",
            "readonly", "editable", "clearable", "dateType", "format", "valueFormat", "max", "min", "valChange"],
        data() {
            return {
                maxWatch: null,
                minWatch: null,
            };
        },
        computed: {
            maxDate(){
                //满足指定条件，最大值限制失效
                if(this.max && this.max.failCondition && needShow(this.max.failCondition,
                    {...this.model})) {
                    return null
                }
                return this.getLimit(this.max, {...this.model});
            },
            minDate(){
                if(this.min && this.min.failCondition && needShow(this.min.failCondition,
                    {...this.model})) {
                    return null
                }
                return this.getLimit(this.min, {...this.model});
            },
            fmt(){
                return GetFormatString(this.format);
            },
            isDisabled() {
                return this.maxDate && this.minDate && moment(this.minDate).unix() > moment(this.maxDate).unix()
            },
            value: {
                get(){
                    let v = this.model[this.field];
                    if(v === "now"){
                        v = moment().format(this.fmt);
                        this.$nextTick(() => {
                            this.syncValue(v);
                        });
                        return v;
                    }
                    else if(v === "today"){
                        v = moment().startOf("day").format(this.fmt);
                        this.$nextTick(() => {
                            this.syncValue(v);
                        });
                        return v;
                    }
                    v = DateFormat(v, this.format);
                    return v;
                },
                set(nv){
                    this.syncValue(nv);
                }
            }
        },
        methods: {
            syncValue(v){
                if(!v){
                    this.$set(this.model, this.field, null);
                    return;
                }
                if(this.valueFormat !== "timestamp"){
                    this.$set(this.model, this.field, v);
                }
                else{
                    let mmt = moment(v, this.fmt);
                    this.$set(this.model, this.field, mmt.unix());
                }
            },
            getLimit(limit, vars){
                if(!limit || !limit.value){
                    return null;
                }
                let base;
                if(limit.value === "today"){
                    base = moment().startOf("day");
                }
                else if(limit.value === "now"){
                    base = moment();
                }
                else{
                    let t = GetDefaultValue(limit.value, vars);
                    if(!t){
                        return null;
                    }
                    // base = moment(t, "YYYY-MM-DD HH:mm:ss");
                    base = (!isNaN(t) && typeof t === "number") ? moment.unix(t) : moment(t, "YYYY-MM-DD HH:mm:ss");
                }

                if(limit.offsetType === "activity") {
                    let offset = Number(EvalExpression(limit.offsetDynamic, vars)) || 0;
                    return base.add(offset, limit.unit).toDate();
                } else {
                    return base.add(limit.offset, limit.unit).toDate();
                }
            },
            onConfirm() {
                this.evalValChange(v);
            },
        },
        mounted(){
            //最大值失效条件相关表单值改变时，重置时间选择
            this.maxWatch = this.$watch(() => {
                if(this.max && this.max.failCondition) {
                    return needShow(this.max.failCondition, {...this.model})
                }
                return null;
            }, (v, ov) => {
                if(JSON.stringify(ov) === JSON.stringify(v)) {
                    return
                }
                // console.log("监听值", v, ov);
                this.value = null;
            }, {deep: true})

            //最小值失效条件相关表单值改变时，重置时间选择
            this.minWatch = this.$watch(() => {
                if(this.min && this.min.failCondition) {
                    return needShow(this.min.failCondition, {...this.model})
                }
                return null;
            }, (v, ov) => {
                if(JSON.stringify(ov) === JSON.stringify(v)) {
                    return
                }
                // console.log("监听值", v, ov);
                this.value = null;
            }, {deep: true})
        },
        beforeMount(){
            this.maxWatch && this.maxWatch();
            this.minWatch && this.minWatch();
        }
    }
</script>
