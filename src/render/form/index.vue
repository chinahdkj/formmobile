<template>
    <mue-form-item class="custom-form-item"
                   :label="name"
                   :field="parentField ? `${parentField}.${index}.${field}` : field"
                   :required="isMust"
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
                   :required="isMust"
                   :class="customClass"
                   :is-design="false"
                   :itf-params="itfParams"
                   :auto-type="autoType"
                   :interface="interface"
                   :after-query="afterQuery"
                   :parent-field="parentField"
                   :disabled="isDisabled"
                   :is-new="isNew"
                   v-bind="$attrs"
                   v-on="$listeners"
                   ref="cpt"/>

    </mue-form-item>
</template>

<script>
    import {ValidateCommon} from "../../utils/validate"
    import {GetDefaultValue, GetInterfaceData, needDisabled, deepClone, needMust} from "../../utils/lib"


    export default {
        components: {},
        inheritAttrs: false,
        /**
         * 参数
         * @param {父组件字段} parentField
         * @param {子组件索引} index 用于区分子表单校验
         * @param {是否新增} isNew 要于区分新增和编辑模式
         * @param {子表单配置信息} subOptions  目前只有子表单项使用
         * @param {父组件} parent  目前只有子表单中有传递
         */
        props: ["name", "field", "type", "model", "vars", "required", "labelLine", "width", "customClass",
            "labelWidth", "labelHidden", "defaultValue", "placeholder", "rules", "showCondition",
            "parentField", "index", "isDesign", "parent", "defaultType", "dftActivity",
            "itfParams" ,"autoType", "interface", "afterQuery", "disabled", "disabledCondition", "mustCondition", "isNew",
            "unique", "uniqueFields", "subOptions", "globalDisabled"],
        computed: {
            isDisabled() {
                return !!this.globalDisabled || this.disabled || needDisabled(this.disabledCondition, this.model, this.vars || {}, this.isNew)
            },
            isMust() {
                return !!this.required || needMust(this.mustCondition, this.model, this.vars || {}, this.isNew)
            },
            customRules() {
                //空数据不做自定义校验
                if (this.model && (this.model[this.field] === "" || this.model[this.field] == null)) {
                    return [];
                }       
                let rules = this.rules;

                //如果为子表单项，不走接口唯一性校验(确保mue-form-item不接收到unique相关的rules,改为subUnique最自定义前端校验)
                if(this.parentField) {
                    rules = rules.map(m => {
                        let temp = deepClone(m);
                        if(temp.type === "unique") {
                            temp.type = "subUnique"
                        }
                        return temp
                    })
                }

                rules = rules.filter(f => f.type).map(m => {
                    if (m.type === "Regular") {
                        return {
                            validator: (r, v, c) => {
                                eval(m.value).test(v) ? c() : c(new Error(m.message || '验证失败，请输入正确格式'));
                            }
                        }
                    }  else if (m.type === "unique") {
                        return m
                    }  else if (m.type === "subUnique") {
                        return {
                            validator: (rule, value, callback) => {
                                if(!this.unique) {
                                    callback();
                                }
                                if(this.unique) {
                                    if((this.uniqueFields || []).length) {
                                        //字段组合唯一性校验
                                        let namedict = {}; //名称字典
                                        let items = this.vars[this.parentField].map(m => {
                                            let obj = {};
                                            for(let key of this.uniqueFields) {
                                                if(key in m) {
                                                    obj[key] = m[key]
                                                    let target = this.subOptions.find(f => f.options.field === key)
                                                    if(target) {
                                                        namedict[key] = target.options.name
                                                    }
                                                }
                                            }
                                            return JSON.stringify(obj)
                                        })
                                        if([...new Set(items)].length < this.vars[this.parentField].length) {
                                            callback(new Error(`字段 [${Object.values(namedict)}] 存在重复数据`))
                                        } else {
                                            callback();
                                        }

                                    } else {
                                        let items = this.vars[this.parentField].map(m => m[this.field])
                                        if([...new Set(items)].length < this.vars[this.parentField].length) {
                                            callback(new Error(`字段 ${name} 存在重复数据`))
                                        } else {
                                            callback();
                                        }
                                    }
                                }
                                callback(new Error(m.message || '验证失败，请输入正确格式'))
                            }
                        }
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
