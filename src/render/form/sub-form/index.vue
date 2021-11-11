<template>
    <div class="sub-form-view">
        <van-icon class="do-expand" :name="expendStatus ? 'arrow-up' : 'arrow-down'" @click="onExpand" />
        <mue-form-item :label="name" :field="field" :inline="false"
                       :data-field="field" :class="['fpt__' + type, customClass ? customClass : '']">
            <div class="form-part" v-for="(row, i) in value" :key="i" :class="{'hide': isHide(i)}">
                <mue-panel :title="!!showRowNum ? `#${i+1}` : ''">
                    <van-icon v-if="!disabled" slot="tools" name="delete" style="line-height: inherit;"
                              @click="delModel(i)"/>
                    <van-icon v-if="isHide(i)" slot="tools" name="arrow-down" @click="showFields(i)"/>
                    <van-icon v-else slot="tools" name="arrow-up" @click="hideFields(i)"/>
                    <div v-for="(sub, idx) in subs" :key="idx">
                        <form-item :model="row"
                                   :type="sub.type"
                                   v-bind="sub.options"
                                   :parent-field="field"
                                   :index="i">
                        </form-item>
                    </div>
                </mue-panel>
            </div>
            <div class="sub-form-handle-btn">
                <van-button size="large" type="primary" native-type="button" @click="addModel">添加</van-button>
            </div>
        </mue-form-item>

    </div>
</template>
<script>
    import FormItem from "../../../render/form";
    export default {
        inheritAttrs: false,
        components: {FormItem},
        mixins: [],
        props: ["id", "subs", "model", "name", "field", "type", "labelLine", "width", "disabled", "align",
            "customClass", "labelWidth", "labelHidden", "showRowNum", "dataType"],
        data() {
            return {
                expendStatus: true,
                flags: [] //{index:0, hideFields: false}
            };
        },
        computed: {
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
            addModel() {
                let fields = {}
                for(let sub of this.subs) {
                    fields[sub.options.field] = sub.options.defaultValue
                }
                this.value.push(fields);
            },
            delModel(i){
                this.value.splice(i, 1);
            },
            isHide(i) {
                return this.value[i].__hideFields;
            },
            showFields(i) {
                if(this.value[i]) {
                    this.$set(this.value[i], "__hideFields", false)
                }
            },
            hideFields(i) {
                if(this.value[i]) {
                    this.$set(this.value[i], "__hideFields", true)
                }
            },
            onExpand() {
                this.expendStatus = !this.expendStatus;
                this.value.forEach((row, i) => {
                    this.$set(this.value[i], "__hideFields", !this.expendStatus)
                })
            }
        }
        // mounted() {
        //     this.$nextTick(() => {
        //         this.$watch(() => {
        //             return this.value
        //         }, (v) => {
        //             console.log(v)
        //         }, {deep: true, immediate: true})
        //     })
        // }
    };
</script>

<style lang="less">
    .sub-form-view {
        position: relative;
        width: 100%;
        margin: 4px 0;

        .do-expand {
            position: absolute;
            right: 15px;
            z-index: 1;
            line-height: 36px;
        }

        > .mue-form-item {
            > label {
                margin-bottom: 10px;
            }

            > .mue-form-item-content {
                background: #f0f0f0;
                padding: 5px;
                margin-bottom: 10px;
            }
        }

        .form-part {
            border: solid 1px #e0e0e0;
            margin-bottom: 5px;

            &.hide {
                .mue-panel-body {
                    display: none;
                }
            }

            .mue-panel-header {
                border-bottom: solid 1px #ebebeb;

                .mue-panel-tools {
                    .van-icon {
                        margin-left:10px;
                    }
                }
            }

            .mue-panel-body {
                > div:last-child {
                    .mue-form-item {
                        border: 0;
                    }
                }
            }

            .mue-form-item > label {
                left: 10px;
            }
        }

        .sub-form-handle-btn {
            display: flex;
            align-items: center;
            padding: 0;

            .van-button {
                border-radius: 3px;
                flex: 1;
            }
        }
    }

</style>
