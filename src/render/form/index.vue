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
                   :placeholder="placeholder"
                   :default-value="defaultValue"
                   :required="!!required"
                   :class="customClass"
                   :is-design="false"
                   v-bind="$attrs"
                   v-on="$listeners"
                   ref="cpt"/>

    </mue-form-item>
</template>

<script>
    import {ValidateCommon} from "../../utils/validate"
    import {GetDefaultValue, TransferUrl} from "../../utils/lib"

    export default {
        components: {},
        inheritAttrs: false,
        //parentField, index用于区分子表单校验, parent父组件(目前只有子表单中有传递)
        props: ["name", "field", "type", "model", "required", "labelLine", "width", "customClass",
            "labelWidth", "labelHidden", "defaultValue", "placeholder", "rules", "showCondition",
            "parentField", "index", "isDesign", "parent", "defaultType", "dftActivity",
            "itfParams" ,"autoType", "interface", "afterQuery"],
        computed: {
            customRules() {
                let rules = this.rules.map(m => {
                    if (m.type === "Regular") {
                        return {
                            validator: (r, v, c) => {
                                eval(m.value).test(v) ? c() : c(new Error(m.message || '验证失败，请输入正确格式'));
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
            initInterfaceData(url, showType) {
                return new Promise((resolve, reject) => {
                    let res_Url = TransferUrl(url, this.model);
                    let success = (res) => {
                        //接口返回数据结构处理，默认是{Code: 0, Message: "", Response: ""形式
                        let result = ""
                        if (this.afterQuery) {
                            try {
                                result = eval(`(function(res) {
                                    ${this.afterQuery || 'return "";'}
                                })(res)`)
                                resolve(result);
                            } catch (e) {
                                resolve("")
                                console.error(e)
                            }
                        } else {
                            if (res.Code === 0) {
                                resolve(res.Response || "")
                            } else {
                                reject(res.Message)
                            }
                        }
                    }

                    let fail = (e) => {
                        console.log(e);
                    }

                    if(this.autoType === 1) {
                        let customParams = JSON.parse(TransferUrl(JSON.stringify(this.itfParams), this.model)); //自定义参数
                        let params = {...customParams, ...{url: res_Url}}
                        this.$server._Post(params, this.$OPTS.urlPrefix || "").then(success).catch(fail);
                    } else {
                        this.$server._Get({url: res_Url}, this.$OPTS.urlPrefix || "").then(success).catch(fail);
                    }
                })
            },
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
                    defaultValue = await this.initInterfaceData(this.interface, this.type);
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

</style>
