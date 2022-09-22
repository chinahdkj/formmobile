<template>
    <div class="sub-form-view-display">
        <van-icon class="do-expand" :name="expendStatus ? 'arrow-up' : 'arrow-down'" @click="onExpand" />
        <div class="container":class="[!!isPager ? 'is-pager' : '']">
            <div class="header">
                {{name}}
            </div>
            <div class="form-part-list">
                <div class="form-part" v-for="(row, i) in (!!isPager ? currentPageVals : value)" :key="i" :class="{'hide': isHide(i)}">
                    <mue-panel :title="!!showRowNum ? `#${!!isPager ? ((pagination.index - 1) * pagination.size + i + 1) : (i + 1)}` : ''">
                        <van-icon v-if="isHide(i)" slot="tools" name="arrow-down" @click="showFields(i)"/>
                        <van-icon v-else slot="tools" name="arrow-up" @click="hideFields(i)"/>
                        <div v-for="(sub, idx) in subs" :key="idx">
                            <item-html :model="row"
                                       :style="colWidthStyle(sub.options.colWidth || '')"
                                       :type="sub.type"
                                       :value="row[sub.options.field]"
                                       v-bind="sub.options"
                                       :all-vars="allVars" :nodes-values-dict="nodesValuesDict">
                            </item-html>
                        </div>
                    </mue-panel>
                </div>
            </div>
            <van-pagination
              v-if="!!isPager"
              v-show="pagination.total > value.length"
              v-model="pagination.index"
              :items-per-page="pagination.size"
              :total-items="pagination.total"
              :show-page-size="5"
              force-ellipses
              @change="pageIndexChange"/>
        </div>
    </div>
</template>
<script>
import ItemHtml from "../../../display/form";
import { deepClone, ReplaceFields } from "../../../utils/lib"
import UUID from "uuid/v4";
export default {
    name: "DspSubForm",
    inheritAttrs: false,
    components: {ItemHtml},
    mixins: [],
    props: ["id", "subs", "model", "name", "field", "type", "labelLine", "width", "disabled", "align",
        "customClass", "labelWidth", "labelHidden", "showRowNum", "allVars", "nodesValuesDict", "isPager",],
    data() {
        return {
            expendStatus: true,
            flags: [], //{index:0, hideFields: false}
            pagination: {
                size: 10,
                index: 1,
                total: 0,
            },
            currentPageVals: [] //分页数据，开启分页时使用
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
                            let defaultValue = sub.options.defaultValue === "$$notExtend" ? null : sub.options.defaultValue
                            row[sub.options.field] = defaultValue
                        }
                    }
                })
                this.$set(this.model, this.field, this.value);
            }
        },
        "value.length": {
            immediate: true, handler(v) {
                if(!!this.isPager) {
                    this.pagination.total = v;
                    this.getCurrentPageDatas();
                }
            }
        }
    },
    methods: {
        pageSizeChange(size) {
            this.pagination.index = 1;
            this.pagination.size = size;
            this.getCurrentPageDatas();
        },
        pageIndexChange(index) {
            this.pagination.index = index;
            this.getCurrentPageDatas();
        },
        getCurrentPageDatas() {
            let currentIndex = this.pagination.index - 1;
            let size = this.pagination.size;
            this.currentPageVals = this.value.slice(currentIndex*size, (currentIndex + 1)*size);
        },
        addModel() {
            let fields = {}
            for(let sub of this.subs) {
              let defaultValue = sub.options.defaultValue === "$$notExtend" ? null : sub.options.defaultValue
                fields[sub.options.field] = defaultValue
                fields['$$innerIsEdit'] = true;
                fields['$$innerId'] = UUID();
            }
            //有分页的情况，新增放置顶层,并且将分页切换到第一页
            if(!!this.isPager) {
                this.pagination.index = 1
                this.value.unshift(fields);
            } else {
                this.value.push(fields);
            }
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
        },
        //列宽表达式
        transColWidth(width) {
            if(width && width.includes("return")) {
                try {
                    let model = deepClone(this.model);
                    let _this = this;

                    let es = ReplaceFields(width);
                    return eval(`(function(model, _this) {
                                                ${es || 'return "";'}
                                            })(model, _this)`)
                } catch (e) {
                    console.info(e);
                    return ""
                }
            } else {
                return width
            }
        },
        colWidthStyle(colwidth){
            if(!colwidth) return
            let result = this.transColWidth(colwidth)
            let num  = result.includes("px") ? Number(result.slice(0, result.length - 2)) : Number(result);
            if(num <= 0){
                return {
                    height:0,
                    minHeight:0,
                    overflow:'hidden'
                }
            }
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
        z-index: 100;
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
    // 翻页
    .container.is-pager{
        .van-pagination{
            margin-top: 5px;
            .van-pagination__item{
                color: #4796e3;
                &--active{
                    color: #ffffff;
                    background: #4796e3;
                }
                &.van-pagination__prev:after{
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                }
                &.van-pagination__next:after{
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                }
            }
        }
    }
}

</style>
