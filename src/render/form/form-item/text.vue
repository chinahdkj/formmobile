<template>
    <mue-input v-model="value"
               :type="type"
               number-type="float"
               :disabled="!!disabled"
               :readonly="!!readonly"
               @blur="onBlur"
               v-bind="$attrs"
               :class="{'is-select':isSelect}">
        <template v-if="unit || isSelect" slot="suffix">
            {{unit}}
            <i v-if="isSelect" class="input__suffix input__suffix_icon iconfont icon-arrows-copy-copy is-select-arrow"></i>
        </template>
    </mue-input>
</template>

<script>
    import BASE from "./base";
    import {Validate} from "../../../utils/validate"
    export default {
        mixins: [BASE],
        name: "FtmText",
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "dataType", "readonly", "unit", "disabled", "afterBlur", "isSelect", "required", "defaultValue",
            "viewerType", "keepSpaces", "vars", "decimalLength", "desensitization", "ndType",
            "bankCardNumbers"],
        data(){
            return {};
        },
        computed: {
            value: {
                get(){
                    // return this.model[this.field];
                    let val = this.model[this.field]
                    if(this.desensitization) {
                        //手机号脱敏
                        if(val && this.ndType === "mobile" && Validate.checkIsTelephone(val)) {
                            return val.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2");
                        }

                        //身份证号脱敏
                        if(val && this.ndType === "idCard" && Validate.checkIsIdcard(val)) {
                            return val.replace(/^(.{8})(?:\d+)(.{4})$/, "$1******$2");
                        }

                        //银行卡脱敏
                        if(val && this.ndType === "bank") {
                            if(this.bankCardNumbers === 16 && Validate.checkIsBankCard16(val)) {
                                return val.replace(/^(.{6})(?:\d+)(.{4})$/, "$1******$2");
                            } else if(this.bankCardNumbers === 19 && Validate.checkIsBankCard19(val)){
                                return val.replace(/^(.{6})(?:\d+)(.{4})$/, "$1*********$2");
                            } else {
                                return val
                            }
                        }

                        return val;
                    }

                    return val;
                },
                set(nv){
                    if (this.type === "number") {
                        let v = nv == null ? "" : String(nv).trim();
                        this.$set(this.model, this.field, v === '-' ? '-' : (!v || isNaN(v) ? 0 : Number(v)));
                    } else {
                        // this.$set(this.model, this.field, nv.replace(/\s*/g,""));
                        if(this.viewerType === "bank") {
                            this.$set(this.model, this.field, nv.replace(/\s/g,'').replace(/....(?!$)/g,'$& '));
                        } else {
                            if(this.keepSpaces) {
                                this.$set(this.model, this.field, nv);
                            } else {
                                this.$set(this.model, this.field, nv.replace(/\s*/g,""));
                            }
                        }
                    }
                }
            },
            type(){
                return this.dataType ? this.dataType.toLowerCase() : "text";
            }
        },
        methods: {
            onBlur() {
                if(this.afterBlur) {
                    try {
                        let value = this.value;
                        let _this = this;
                        let $post = this.$server._Post
                        let $get = this.$server._Get
                        eval(this.afterBlur)
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.is-select{
    .mue-form-input .input__suffix{
        display: inline-flex;
        .is-select-arrow{
            pointer-events: none;
            display: block;
            right: 5px;
            text-align: right;
            height: 20px;
            line-height: 20px;
            color: #757575;
            margin-left: 0;
            flex: 0 0 auto;
            transform: rotate(-90deg);
            right: 0;
        }
    }
}

</style>