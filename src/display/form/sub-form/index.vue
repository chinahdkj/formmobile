<template>
    <div class="sub-form-view-display">
        <van-icon class="do-expand" :name="expendStatus ? 'arrow-up' : 'arrow-down'" @click="onExpand" />
        <div class="container">
            <div class="header">
                {{name}}
            </div>
            <div class="form-part-list">
                <div class="form-part" v-for="(row, i) in value" :key="i" :class="{'hide': isHide(i)}">
                    <mue-panel :title="!!showRowNum ? `#${i+1}` : ''">
                        <van-icon v-if="isHide(i)" slot="tools" name="arrow-down" @click="showFields(i)"/>
                        <van-icon v-else slot="tools" name="arrow-up" @click="hideFields(i)"/>
                        <div v-for="(sub, idx) in subs" :key="idx">
                            <item-html :model="row"
                                       :type="sub.type"
                                       :value="row[sub.options.field]"
                                       v-bind="sub.options">
                            </item-html>
                        </div>
                    </mue-panel>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ItemHtml from "../../../display/form";
export default {
    name: "DspSubForm",
    inheritAttrs: false,
    components: {ItemHtml},
    mixins: [],
    props: ["id", "subs", "model", "name", "field", "type", "labelLine", "width", "disabled", "align",
        "customClass", "labelWidth", "labelHidden", "showRowNum"],
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
};
</script>

<style lang="less">
.sub-form-view-display {
    position: relative;
    width: 100%;
    margin: 4px 0;

    .container {
        background-color: #ffffff;
        padding:0 10px;
        box-sizing: border-box;
        border-bottom: #ebebeb 1px solid;

        .header {
            height: 36px;
            line-height: 36px;
            padding-left: 5px;
        }

        .form-part-list {
            background: #f0f0f0;
            padding: 5px;
            margin-bottom: 10px;

            .form-part {
                border: solid 1px #e0e0e0;
                margin-bottom: 5px;

                &:last-child {
                    margin: 0;
                }

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
                        .dsp-form-item {
                            border: 0;
                        }
                    }
                }

            }
        }
    }

    .do-expand {
        position: absolute;
        right: 15px;
        z-index: 1;
        line-height: 36px;
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
