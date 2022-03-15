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
                   v-bind="$attrs"
                   v-on="$listeners"
                   ref="cpt"/>

    </mue-form-item>
</template>

<script>
    import {ValidateCommon} from "../../utils/validate"
    import {GetDefaultValue, GetInterfaceData} from "../../utils/lib"

    export default {
        components: {},
        inheritAttrs: false,
        /**
         * 参数
         * @param {父组件字段} parentField
         * @param {子组件索引} index 用于区分子表单校验
         * @param {父组件} parent  目前只有子表单中有传递
         */
        props: ["name", "field", "type", "model", "vars", "required", "labelLine", "width", "customClass",
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

</style>
