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
                   :all-vars="allVars"
                   :nodes-values-dict="nodesValuesDict"
                   :user-key="userKey"
                   v-bind="$attrs"
                   v-on="$listeners"
                   ref="cpt"/>

    </mue-form-item>
</template>

<script>
    import {ValidateCommon} from "../../utils/validate"
    import {GetDefaultValue, GetInterfaceData, needDisabled, deepClone, needMust, ReplaceFields} from "../../utils/lib"
    import Authority from "../../components/authority"

    export default {
        inject: {
            SUBFORM: {
                from: "SUBFORM",
                default: null
            },
        },
        mixins: [Authority], //混入表单权限，取currentFieldAuth 当前字段权限对象
        components: {},
        inheritAttrs: false,
        /**
         * 参数
         * @param {父组件字段} parentField
         * @param {子组件索引} index 用于区分子表单校验
         * @param {是否新增} isNew 要于区分新增和编辑模式
         * @param {子表单配置信息} subOptions  目前只有子表单项使用
         * @param {父组件} parent  目前只有子表单中有传递
         * @param {当前整个表单数据} vars 子表单项中使用
         * @param {流程中的所有表单数据结合} allVars 流程中使用
         * @param {用户主键} userKey 子表用户字段检验用
         * @param {Object/String} nodesValuesDict  所有节点数据字典 流程中使用
         * @param {Array} authority  表单权限
         */
        props: ["name", "field", "type", "model", "vars", "required", "labelLine", "width", "customClass",
            "labelWidth", "labelHidden", "defaultValue", "placeholder", "rules", "showCondition",
            "parentField", "index", "isDesign", "parent", "defaultType", "dftActivity", "userKey",
            "itfParams" ,"autoType", "interface", "afterQuery", "disabled", "disabledCondition", "mustCondition", "isNew",
            "unique", "uniqueFields", "subOptions", "globalDisabled", "isCurrentUser", "isCurrentGroup", "allVars", "nodesValuesDict", "authority", "colWidth"],
        computed: {
            isDisabled() {
                return !!this.globalDisabled
                || this.disabled
                || this.needDisabled(this.disabledCondition, this.model, this.vars || {}, this.isNew, this.index)
                || !this.currentFieldAuth.edit
            },
            isMust() {
                //子表项宽度小于0，处于隐藏状态的，跳过必填校验
                if(this.colWidth) {
                    let num  = this.colWidth.includes("px") ? Number(this.colWidth.slice(0, this.colWidth.length - 2)) : Number(this.colWidth);
                    if(num < 0) {
                        return false
                    }
                }

                return !!this.required
                || needMust(this.mustCondition, this.model, this.vars || {}, this.isNew)
                || this.currentFieldAuth.required
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
            //子表中，当前表单项所在行索引
            needDisabled(condition, model, vars, isNew, index) {
                if(!condition){
                    return false;
                }

                let cdn = ReplaceFields(condition)
                let r = false;
                try{
                    r = eval(cdn);
                } catch(e){
                    console.error(e);
                    r = false;
                }
                return !!r;
            },
            async setDefaultValue() {
                if (this.model && (this.model[this.field] || this.model[this.field] === 0)) {
                    return;
                }
                let defaultValue = this.defaultValue;

                //日期组件特殊处理
                if(this.type === 'date-picker'){
                    //动态时间默认值
                    if (this.defaultType === 'activity') {
                        try {
                            let Moment = moment;
                            let model = this.model;
                            let vars = this.vars;
                            defaultValue = eval(`(function (moment, model, vars) {
                            ${this.dftActivity}
                        })(Moment, model, vars)`)
                        } catch (e) {
                            console.error(e);
                        }
                    } else {
                        //转换成秒
                        if (typeof defaultValue === "number") defaultValue = defaultValue / 1000
                    }                    
                }

                //文本框默认值从接口获取
                if(this.type === 'text' && this.defaultType === 'interface') {
                    defaultValue = await GetInterfaceData(this.interface, this.$OPTS.urlPrefix,
                        this.model, this.afterQuery, this.autoType, this.itfParams);
                }

                //用户选择组件取当前登录人
                if(this.type === "user-picker" && !!this.isCurrentUser) {
                    defaultValue = window.FORM_CurrentUser.user_id || ""
                    this.$set(this.model, `${this.field}$$text`, window.FORM_CurrentUser.user_nm);
                }

                //部门选择组件取当前登录人部门
                if(this.type === "department-picker" && !!this.isCurrentGroup) {
                    defaultValue = window.FORM_CurrentUser.group_id || ""
                    this.$set(this.model, `${this.field}$$text`, window.FORM_CurrentUser.group_nm);
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
