<template>
    <mue-form-item class="custom-form-item"
                   :label="name"
                   :field="parentField ? `${parentField}.${index}.${field}` : field"
                   :required="!!required"
                   :label-width="labelWidth"
                   :inline="!labelLine"
                   :label-hidden="!!labelHidden"
                   :class="['fpt__' + type, customClass ? customClass : '']"
                   :data-field="field"
                   :rules="customRules">

        <component :is="'ftm-' + type"
                   :field="field"
                   :model="model"
                   :vars="vars"
                   :placeholder="placeholder"
                   :default-value="defaultValue"
                   :required="!!required"
                   :class="customClass"
                   :is-design="false"
                   :itf-params="itfParams"
                   :auto-type="autoType"
                   :interface="interface"
                   :after-query="afterQuery"
                   :disabled="isDisabled"
                   :is-new="isNew"
                   v-bind="$attrs"
                   v-on="$listeners"
                   ref="cpt"/>

    </mue-form-item>
</template>

<script>
    import {ValidateCommon} from "../../utils/validate"
    import {GetDefaultValue, GetInterfaceData, needDisabled} from "../../utils/lib"

    export default {
        components: {},
        inheritAttrs: false,
        /**
         * 参数
         * @param {父组件字段} parentField
         * @param {子组件索引} index 用于区分子表单校验
         * @param {是否新增} isNew 要于区分新增和编辑模式
         * @param {父组件} parent  目前只有子表单中有传递
         */
        props: ["name", "field", "type", "model", "vars", "required", "labelLine", "width", "customClass",
            "labelWidth", "labelHidden", "defaultValue", "placeholder", "rules", "showCondition",
            "parentField", "index", "isDesign", "parent", "defaultType", "dftActivity",
            "itfParams" ,"autoType", "interface", "afterQuery","disabled","disabledCondition","isNew",
            "unique", "uniqueFields"],
        computed: {
            isDisabled() {
                return this.disabled || needDisabled(this.disabledCondition, this.model, this.vars || {}, this.isNew)
            },
            customRules() {
                //空数据不做自定义校验
                if (this.model && (this.model[this.field] === "" || this.model[this.field] == null)) {
                    return [];
                }       
                let rules = this.rules.filter(f => f.type).map(m => {
                    if (m.type === "Regular") {
                        return {
                            validator: (r, v, c) => {
                                eval(m.value).test(v) ? c() : c(new Error(m.message || '验证失败，请输入正确格式'));
                            }
                        }
                    }  else if (m.type === "unique") {
                        return m
                    } else {
                        return ValidateCommon(m.type)
                    }
                })
                return rules;
            }
        },
        methods: {
            async setDefaultValue() {
                if (this.model && (this.model[this.field] || this.model[this.field] === 0)) {
                    return;
                }
                let defaultValue = this.defaultValue;

                //动态时间默认值
                if(this.type === 'date-picker' && this.defaultType === 'activity') {
                    try {
                        let Moment = moment;
                        defaultValue = eval(`(function(moment) { ${this.dftActivity} })(Moment)`)
                    } catch (e) {
                        console.error(e);
                    }
                }

                //文本框默认值从接口获取
                if(this.type === 'text' && this.defaultType === 'interface') {
                    defaultValue = await GetInterfaceData(this.interface, this.$OPTS.urlPrefix,
                        this.model, this.afterQuery, this.autoType, this.itfParams);
                }

                let dv = GetDefaultValue(defaultValue, {}, this.field);
                this.$set(this.model, this.field, dv);
            }
        },
        beforeMount() {
            this.setDefaultValue();
        }
    };
</script>

<style lang="less">
// .mue-form-item{

//     &.not-inline{

//         .mue-form-item-content{
//             text-align: left;
//             .mue-form-input{
//                 .input__inner{
//                     text-align: left !important;
//                 }
//             }
//             .ftm__radio,.ftm__checkbox{
//                 justify-content:flex-start;
//                 .van-radio:first-child,.van-checkbox:first-child{
//                     margin-left: 5px;
//                 }
//             }
//             .van-switch{
//                 margin-left: 5px;
//             }
//             .mue-img-upload-list,.mue-upload-list,.mue-sound-record-list,.mue-signature-list{
//                 justify-content: flex-start;
//             }
//         }

//     }
// }

// .sub-form-view{

//     .mue-form-item{

//         &.not-inline{

//             .mue-form-item-content{
//                 padding-left: 10px;
//             }

//         }
//     }
// }
</style>
