<template>
    <div class="dsp-form-item" :class="['dsp-form-item__' + type, customClass, isLabelLine]" :style="boxstyle">
        <div class="label" v-show="!labelHidden" :style="labelStyle">
            <div v-if="labelHtml" v-html="labelHtml"></div>
            <span v-else>{{name}}</span>
        </div>

        <div v-if="!type" class="value" :style="labelStyle">{{value}}</div>
        <component v-else class="value"
                   :is="'dsp-' + type"
                   :value="value"
                   :field="field"
                   :model="model"
                   :default-value="defaultValue"
                   :class="customClass"
                   :all-vars="allVars"
                   :nodes-values-dict="nodesValuesDict"
                   v-bind="$attrs">
        </component>
    </div>
</template>

<script>
    export default {
        components: {},
        inheritAttrs: false,
        props: [
            "value", "model", "type",
            "name", "field", "labelLine", "width", "customClass", "labelWidth", "labelHidden",
            "defaultValue", "showCondition", "isDesign", "labelHtml", "allVars", "nodesValuesDict",
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
                width: 100% !important;
                text-align: left;
                justify-content: flex-start;
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
