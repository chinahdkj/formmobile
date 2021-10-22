<template>
    <div class="custom-form-group-subforms-container">

        <cue-form-item class="custom-form-item"
                       :label="name"
                       :field="field"
                       :label-width="labelWidth"
                       :label-line="labelLine"
                       :label-hidden="!!labelHidden"
                       :class="['fpt__' + type, customClass ? customClass : '']"
                       :data-field="field"
                       :style="style">

            <div class="custom-form-group-subforms">
                <div class="sub-form-index" v-if="showRowNum">
                    <el-table :data="[{index: 1}]">
                        <el-table-column fixed prop="index" label="#" width="50" :align="align"></el-table-column>
                    </el-table>
                </div>

                <div class="sub-form-content">
<!--                    <cue-form>-->
                        <drag-panel class="custom-form-group-sub-content" v-model="subForm.subs"
                                    ghostClass="ghost" @add="onAdd" :group="{put: true}">
                            <slot :items="subForm.subs" :parent="subForm"></slot>
                        </drag-panel>
<!--                    </cue-form>-->
                </div>
            </div>

        </cue-form-item>

        <div class="handles-btns">
            <i title="删除" @click.stop="onDelete"
               class="el-icon-delete"/>
        </div>

    </div>
</template>
<script>
    //设计模式中，子表单表现区别于渲染中的样式及模式
    import BASE from "./base";

    export default {
        inheritAttrs: false,
        components: {},
        mixins: [BASE],
        props: ["id", "subForm", "name", "field", "type", "labelLine", "width", "disabled", "align",
            "customClass", "labelWidth", "labelHidden", "showRowNum", "showCondition", "isDesign"],
        data() {
            return {};
        },
        computed: {
            style() {
                if (!this.width) {
                    return {width: "100%"};
                }
                return {width: this.width};
            },
        },
        watch: {},
        methods: {
            onAdd() {
                this.$emit("add-item");
            },
            onDelete() {
                this.$emit("delete-item", this.id);
            }
        },
    };
</script>

<style lang="less">
    .custom-form-group-subforms-container{
        width: 100%;

        .custom-form-group-subforms {
            position: relative;
            width: 100%;
            display:flex;
            padding-right:10px;

            .sub-form-index{
                flex: 0 0 50px;
                border: dashed 1px #e0e0e0;
                background-color:#ffffff;
                .el-table::before {
                    height:0;
                }
                .el-table--mini td{
                    border:0;
                }
            }

            .sub-form-content{
                flex: 1;
                display:flex;
                background-color: #ffffff;
                cursor: move;
                border: dashed 1px #e0e0e0;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                flex-direction: row;
                position: relative;
                overflow-x: auto;
                min-height:50px;

                /*> .cue-form {
                    flex:1;
                    display: flex;
                    flex-flow: nowrap row;
                    justify-content: flex-start;
                    align-items: stretch;
                }*/
            }

            .custom-form-group-sub-content {
                flex:1;
                display: flex;
                flex-flow: nowrap row;
                justify-content: flex-start;
                align-items: stretch;

                &.ghost {
                    opacity: 0.4;
                }

                > .ghost{
                    width: 4px !important;
                    flex: 0 0 4px !important;
                    height: 100% !important;
                    overflow: hidden;
                    position: relative;
                    opacity: 1!important;
                    padding: 0 !important;
                    border: 0!important;
                    &:after{
                        content: "";
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: #e6a23c;
                        z-index: 9000;
                        display: block;
                    }
                }

            }

        }
    }
</style>
