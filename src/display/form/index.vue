<template>
    <div class="dsp-form-item" :class="['dsp-form-item__' + type, customClass, isLabelLine]" :style="boxstyle">
        <div class="label" :style="labelStyle">{{name}}</div>

        <div v-if="!type" class="value" :style="labelStyle">{{value}}</div>
        <component v-else class="value"
                   :is="'dsp-' + type"
                   :value="value"
                   :field="field"
                   :model="model"
                   :default-value="defaultValue"
                   :class="customClass"
                   v-bind="$attrs">
        </component>
    </div>
</template>

<script>

    //基础组件
    import DspText from "./form-item/text";
    import DspTextarea from "./form-item/textarea";
    import DspSelect from "./form-item/select";
    import DspRadio from "./form-item/radio";
    import DspCheckbox from "./form-item/checkbox";
    import DspSwitch from "./form-item/switch";
    import DspInputNumber from "./form-item/input-number";
    import DspTimePicker from "./form-item/time-picker";
    import DspDatePicker from "./form-item/date-picker";
    import DspDateRangePicker from "./form-item/date-range-picker";
    import DspRate from "./form-item/rate";
    import DspColorPicker from "./form-item/color-picker";
    import DspSlider from "./form-item/slider";
    import DspWord from "./form-item/word";
    import DspHtml from "./form-item/html";

    //高级组件
    import DspFile from "./form-item/super-form-item/file";
    import DspVideo from "./form-item/super-form-item/video";
    import DspPicture from "./form-item/super-form-item/picture";
    import DspEditor from "./form-item/super-form-item/editor";
    import DspCascader from "./form-item/super-form-item/cascader";

    //功能组件
    import DspUserPicker from "./form-item/functional/user-picker";
    import DspDepartmentPicker from "./form-item/functional/department-picker";
    import DspExpression from "./form-item/functional/expression";
    import DspZtree from "./form-item/functional/ztree";
    import DspLocation from "./form-item/functional/location";
    import DspAutocomplete from "./form-item/functional/autocomplete";

    //移动端组件
    import DspWaterMarkingCamera from "./form-item/mobile/water-marking-camera";
    import DspCodeScanner from "./form-item/mobile/code-scanner";
    import DspAudio from "./form-item/mobile/audio";
    import DspSignature from "./form-item/mobile/signature";

    export default {
        components: {
            DspText, DspTextarea, DspSelect, DspRadio, DspCheckbox, DspSwitch, DspInputNumber,
            DspTimePicker, DspDatePicker, DspDateRangePicker, DspRate, DspColorPicker, DspSlider,
            DspWord, DspHtml,

            DspFile, DspVideo, DspPicture, DspEditor, DspCascader,

            DspUserPicker, DspDepartmentPicker, DspExpression, DspZtree, DspLocation, DspAutocomplete,

            DspWaterMarkingCamera, DspCodeScanner, DspAudio, DspSignature
        },
        inheritAttrs: false,
        props: [
            "value", "model", "type",
            "name", "field", "labelLine", "width", "customClass", "labelWidth", "labelHidden",
            "defaultValue", "showCondition", "isDesign"
        ],
        computed: {
            boxstyle() {
                if (!this.width) {
                    return {width: "100%"};
                }
                return {width: this.width};
            },
            labelStyle() {
                return {
                    width: this.labelWidth ? `${this.labelWidth}px` : '110px'
                }
            },
            isLabelLine() {
                return this.labelLine ? 'is-label-line' : ''
            }
        },
        methods: {}
    };
</script>

<style lang="less">
    .dsp-form-item{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 15px;
        border-bottom: solid 1px #ebebeb;
        background: #ffffff;
        box-sizing: border-box;

        .label {
            flex-shrink: 0;
            line-height: 30px;
            box-sizing: border-box;
            margin: 5px 0;
            color: #888888;
        }

        .value {
            flex: 1;
            padding:0 0 0 20px;
            line-height: 30px;
            box-sizing: border-box;
            margin: 5px 0;
            display: inline-flex;
            align-items: center;
            justify-content: flex-end;
        }

        &.is-label-line {
            flex-direction: column;
            .label {
                text-align: left;
                width: 100% !important;
            }
            .value {
                padding-left: 0;
            }
        }

        &.dsp-form-item__slider {
            .value {
                display: block;
            }
        }
    }

    .dsp__img-upload {
        display: inline-flex;
        flex-wrap: wrap;
        flex-direction: row;
        padding-bottom: 3px;
        align-items: center;
        justify-content: flex-start;
        align-content: flex-start;
        line-height: 0;

        //.el-image {
        //    margin-top: 3px;
        //    flex-grow: 0;
        //    flex-shrink: 0;
        //    flex-basis: auto;
        //    display: inline-block;
        //    margin-right: 5px;
        //    cursor: pointer;
        //    width: 60px;
        //    height: 60px;
        //    border: 1px solid #cbd5dd;
        //}
    }
</style>
