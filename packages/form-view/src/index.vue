<template>
    <div class="form-view" v-loading.fullscreen.lock="loading">
        <mue-form v-if="!noForm && ready" v-model="model" ref="form" :class="globalConfig.customClass" v-bind="globalConfig"
                  :style="formStyle" :crud="crud">
            <form-items v-for="item in forms" :key="item.id" :item="item" :list="forms" :is-new="isNew" :all-vars="allVars" :global-disabled="disabled"></form-items>
        </mue-form>
        <div v-if="noForm" :class="globalConfig.customClass" v-bind="globalConfig" :style="formStyle">
            <form-items v-for="item in forms" :key="item.id" :item="item" :list="forms" :is-new="isNew" :all-vars="allVars" :global-disabled="disabled"></form-items>
        </div>

        <div v-if="!!globalConfig.disabled" class="readonly-shadow"></div>
    </div>
</template>

<script>
/*--- 表单展示控件 ---*/
import FormItems from "./form-items"
import {GlobalDefaultOptions} from "../../../src/utils/lib";
import {deepClone} from "../../../src/utils/lib";

export default {
    name: "form-view",
    provide() {
        return {PREVIEW: this};
    },
    components: {FormItems},
    props: {
        formObject: {
            type: Object,
            default: () => {}
        },
        value: {
            type: Object,
            default: () => {}
        },
        crud: { //唯一性校验需传递crud对象
            type: Object,
            default: () => {}
        },
        allVars: { //所有节点数据对象（流程节点中使用）
            type: Object,
            default: () => {}
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isNew: {type: Boolean, default: true}, //表单模式（新增|修改）,默认新增
        noForm: {type: Boolean, default: false}, //不拥有自己的mue-form容器，默认拥有
        formSet: {type: Function, default: null}, //渲染结束前处理model的钩子，可用于设置初始值
        formGet: {type: Function, default: null} //获取model数据前的钩子，可用于修改结果
    },
    data() {
        return {
            ready: true,
            loading: false,
            forms: [],
            model: {},
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
                if(!this.noForm) this._resetForm();

            }
        },
        value: {
            immediate: true, deep: true, handler(v, ov) {
                if(JSON.stringify(v) === JSON.stringify(ov)) return;
                this.model = deepClone(v);
            }
        },
        model: {
            deep: true, handler(v, ov) {
                this.$emit("input", v);
            }
        }
    },
    computed: {
        formStyle() {
            return this.globalConfig.width ? {width: this.globalConfig.width} : null
        }
    },
    methods: {
        initModel() {
            this.$nextTick(() => {
                if (typeof this.formSet === "function") {
                    this.model = this.formSet(this.model);
                }
                this.$emit("rendered", this.formObject, this.model);
            })
        },
        _resetForm() {
            if(this.$refs.form) this.$refs.form.ClearValid();
            this.model = {};
            this.ready = false;
            this.$nextTick(() => {
                this.ready = true;
                this.initModel();
            })

        },
        _getFormData() {
            return new Promise((resolve, reject) => {
                this.loading = true;
                let model = this.model;
                if (typeof this.formGet === "function") {
                    model = this.formGet(model);
                }
                if(this.$refs.form) {
                    this.$refs.form.Validate(model).then(() => {
                        this.loading = false;
                        resolve({model: this.dataformat(model)});
                    }).catch((error) => {
                        this.loading = false;
                        this.$refs.form.ShowError(error);
                        reject({model: this.dataformat(model), error});
                    });
                } else {
                    this.loading = false;
                    resolve({model: this.dataformat(model)});
                }

            });
        },
        dataformat(model) {
            this.forms.forEach(f => {
                //子表单数据处理
                if(f.type === 'sub-form' || f.type === "sub-user") {
                    if(f.options.field in model && f.options.dataType === "String") {
                        model[f.options.field] = JSON.stringify(model[f.options.field])
                    }
                }
            });
            return model;
        }
    },
    mounted() {

    }
};
</script>

<style lang="less">
.form-view {
    position: relative;

    .mue-form {
        .mue-form-buttons {
            display: none;
        }
    }

    .readonly-shadow {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: rgba(255,255,255,0.3);
    }
}
</style>
