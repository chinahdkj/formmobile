<template>
    <div>
        <cue-dialog :visible.sync="visible" append-to-body fullscreen custom-class="form-preview"
                    :title="title" :close-on-click-modal="false" v-loading.fullscreen="loading">

            <form-viewr ref="formView" :form-object="{list: forms, globalConfig}"></form-viewr>

            <div slot="footer">
                <el-button size="mini" @click="visible = false">关闭</el-button>
                <el-button size="mini" @click="resetForm">重置</el-button>
                <el-button size="mini" type="primary" @click="getFormData">获取数据</el-button>
            </div>

        </cue-dialog>

        <editor-dialog v-model="jsonPreview"
                       :data.sync="JSON.stringify(model)"
                       title="数据预览"
                       type="json"
                       :has-handle="false"/>

    </div>
</template>

<script>
    import EditorDialog from "../../components/editorDialog"
    import formViewr from "../../../packages/form-view/src/index"

    export default {
        provide() {
            return {PREVIEW: this};
        },
        components: {EditorDialog, formViewr},
        props: {
            value: {
                type: Boolean,
                default: false
            },
            forms: {
                type: Array,
                default: () => []
            },
            globalConfig: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                loading: false,
                title: "预览",
                model: {},
                jsonPreview: false
            };
        },
        computed: {
            visible: {
                get() {
                    return this.value;
                },
                set(nv) {
                    this.$emit("input", nv);
                }
            },
            formStyle() {
                return this.globalConfig.width ? {width: this.globalConfig.width} : null
            }
        },
        methods: {
            getFormData() {
                this.$refs.formView._getFormData().then(({model}) => {
                    this.model = model;
                    this.jsonPreview = true;
                })
            },
            resetForm() {
                this.$refs.formView._resetForm();
            }
        }
    };
</script>

<style lang="less">
    body .form-preview .el-dialog__body {
        padding: 20px;
        .custom-form-group-tabs, .custom-form-group-grids, .custom-form-group-card {
            padding: 0;
            .custom-form-group-tab-content, .custom-form-group-grid-content, .custom-form-group-card-content{
                align-items: center;
                border:0;
                .panel-form-design-item{
                    box-sizing: border-box;
                    width: 100%;
                    display:inline-flex;
                    flex-direction: row;
                    flex-wrap:nowrap;
                    position:relative;
                    margin-bottom:0;
                }
            }
            .handles-btns{
                display:none;
            }
        }

        .cue-form {
            margin: auto;
        }
    }
</style>
