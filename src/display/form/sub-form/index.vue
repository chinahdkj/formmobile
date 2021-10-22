<template>
    <div class="sub-form-view-display">

        <el-table border :data="value" >
            <el-table-column prop="index" label="#" width="50px" :align="align">
                <template slot-scope="{$index}">
                    {{$index + 1}}
                </template>
            </el-table-column>
            <el-table-column :prop="sub.id" :label="sub.options.name" :align="align"
                             v-for="(sub, i) in subs" :key="i">
                <template #header="{column}">
                    <span v-if="sub.options.required" class="must">*</span>
                    {{column.label}}
                </template>
                <template slot-scope="{row, $index}">
                    <item-html v-bind="sub.options" :model="row" :value="row[sub.options.field]" :type="sub.type"></item-html>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import ItemHtml from "../../../display/form";
    export default {
        inheritAttrs: false,
        components: {ItemHtml},
        mixins: [],
        props: ["id", "subs", "model", "name", "field", "type", "labelLine", "width", "disabled", "align",
            "customClass", "labelWidth", "labelHidden", "showRowNum"],
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
            btnPosition() {
                return {paddingLeft: !this.labelHidden ? `${this.labelWidth + 20}px` : 0}
            },
            value: {
                get(){
                    let v = this.model[this.field] || []
                    return Array.isArray(v) ? v : JSON.parse(v);
                },
                set(nv){
                    this.$set(this.model, this.field, nv);
                }
            }
        },
        watch: {
            subs: {
                immediate: true, deep: true, handler(v, ov) {
                    this.value.forEach(row => {
                        for(let sub of v) {
                            if(!(sub.options.field in row)) {
                                row[sub.options.field] = sub.options.defaultValue
                            }
                        }
                    })
                    this.$set(this.model, this.field, this.value);
                }
            }
        },
        methods: {
        },
    };
</script>

<style lang="less">
    .sub-form-view-display {
        width: 100%;
        .el-table {
            .dsp-form-item {
                .label {
                    display: none;
                }
                .value {
                    padding: 0 10px;
                }
            }
            .el-table__header{
                .cell .must{
                    color:#f56c6c;
                    margin-right:4px;
                    vertical-align: top;
                }
            }
        }

        .custom-form-item.cue-form-item.is-label-hidden {
            padding-left:0;

            > .cue-form-item__content {
                padding-left: 0;
            }
        }

        .sub-form-handle-btn{

        }
    }
</style>
