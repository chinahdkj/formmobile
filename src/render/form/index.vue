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
    import {GetDefaultValue} from "../../utils/lib"

    //基础组件
    import FtmText from "./form-item/text";
    import FtmTextarea from "./form-item/textarea";
    import FtmSelect from "./form-item/select";
    import FtmRadio from "./form-item/radio";
    import FtmCheckbox from "./form-item/checkbox";
    import FtmSwitch from "./form-item/switch";
    import FtmInputNumber from "./form-item/input-number";
    import FtmTimePicker from "./form-item/time-picker";
    import FtmDatePicker from "./form-item/date-picker";
    import FtmDateRangePicker from "./form-item/date-range-picker";
    import FtmRate from "./form-item/rate";
    import FtmColorPicker from "./form-item/color-picker";
    import FtmSlider from "./form-item/slider";
    import FtmWord from "./form-item/word";
    import FtmHtml from "./form-item/html";

    //高级组件
    import FtmFile from "./form-item/super-form-item/file";
    import FtmVideo from "./form-item/super-form-item/video";
    import FtmPicture from "./form-item/super-form-item/picture";
    import FtmEditor from "./form-item/super-form-item/editor";
    import FtmCascader from "./form-item/super-form-item/cascader";

    //功能组件
    import FtmUserPicker from "./form-item/functional/user-picker";
    import FtmDepartmentPicker from "./form-item/functional/department-picker";
    import FtmExpression from "./form-item/functional/expression";
    import FtmZtree from "./form-item/functional/ztree";
    import FtmLocation from "./form-item/functional/location";
    import FtmAutocomplete from "./form-item/functional/autocomplete";

    //移动端组件
    import FtmWaterMarkingCamera from "./form-item/mobile/water-marking-camera";
    import FtmCodeScanner from "./form-item/mobile/code-scanner";
    import FtmAudio from "./form-item/mobile/audio";
    import FtmSignature from "./form-item/mobile/signature";

    export default {
        components: {
            FtmText, FtmTextarea, FtmSelect, FtmRadio, FtmCheckbox, FtmSwitch, FtmInputNumber,
            FtmTimePicker, FtmDatePicker, FtmDateRangePicker, FtmRate, FtmColorPicker, FtmSlider,
            FtmWord, FtmHtml,

            FtmFile, FtmVideo, FtmPicture, FtmEditor, FtmCascader,

            FtmUserPicker, FtmDepartmentPicker, FtmExpression, FtmZtree, FtmLocation, FtmAutocomplete,

            FtmWaterMarkingCamera, FtmCodeScanner, FtmAudio, FtmSignature
        },
        inheritAttrs: false,
        //parentField, index用于区分子表单校验, parent父组件(目前只有子表单中有传递)
        props: ["name", "field", "type", "model", "required", "labelLine", "width", "customClass",
            "labelWidth", "labelHidden", "defaultValue", "placeholder", "rules", "showCondition",
            "parentField", "index", "isDesign", "parent", "defaultType", "dftActivity"],
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
        },
        beforeMount() {
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

            let dv = GetDefaultValue(defaultValue, {}, this.field);
            this.$set(this.model, this.field, dv);
        }
    };
</script>

<style lang="less">

</style>
