<template>
    <div class="form-display" v-loading.fullscreen.lock="loading">
        <div :class="globalConfig.customClass" v-bind="globalConfig" :style="formStyle">
            <display-items v-for="item in forms" :key="item.id" :item="item" :list="forms" :model="model"></display-items>
        </div>
    </div>
</template>

<script>
    /*--- 数据展示控件 ---*/
    import DisplayItems from "./display-items"
    import {GlobalDefaultOptions, deepClone} from "../../../src/utils/lib";

    export default {
        name: "form-display",
        components: {DisplayItems},
        props: {
            model: {
                type: Object,
                default: () => {}
            },
            formObject: {
                type: Object,
                default: () => {}
            },
        },
        data() {
            return {
                loading: false,
                forms: [], //所有表单项，包含布局
                globalConfig: GlobalDefaultOptions() //表单全局配置
            };
        },
        watch: {
            formObject: {
                immediate: true, deep: true, handler(v, ov) {
                    if (!v || JSON.stringify(v) === JSON.stringify(ov)) {
                        return
                    }
                    this.forms = v.list ? deepClone(v.list) : [];
                    this.globalConfig = v.globalConfig ? deepClone(v.globalConfig) : {};
                }
            }
        },
        computed: {
            formStyle() {
                return this.globalConfig.width ? {width: this.globalConfig.width} : null
            }
        },
        methods: {
        },
        mounted() {
        }
    };
</script>

<style lang="less">
    .form-display {
        position: relative;
        font-size: 14px;

        //.custom-form-group-tabs, .custom-form-group-grids, .custom-form-group-card {
        //    padding: 0;
        //
        //    .custom-form-group-tab-content, .custom-form-group-grid-content, .custom-form-group-card-content {
        //        align-items: center;
        //        border: 0;
        //        min-height: auto;
        //
        //        .panel-form-item-display {
        //            box-sizing: border-box;
        //            width: 100%;
        //            display: inline-flex;
        //            flex-direction: row;
        //            flex-wrap: nowrap;
        //            position: relative;
        //            margin-bottom: 0;
        //        }
        //    }
        //
        //    .handles-btns {
        //        display: none;
        //    }
        //}
    }
</style>
