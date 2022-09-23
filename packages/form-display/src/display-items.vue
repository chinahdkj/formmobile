<template>
    <div v-if="isShow" v-show="isShowOfVshow && isEmptyCardShow" class="panel-form-item-display" :data-id="item.id">
        <tabs-panel v-if="item.type === 'tabs'" v-bind="item.options" :id="item.id" :tabs="item.tabs" :model="model" panel-type="view">
            <template slot-scope="{tab, items}">
                <display-items v-for="itm in items" :key="itm.id" :item="itm" :list="items" :model="model" :all-vars="allVars" :nodes-values-dict="nodesValuesDict"/>
            </template>
        </tabs-panel>

        <grids-panel v-else-if="item.type === 'grids'" v-bind="item.options" :id="item.id" :cols="item.cols" panel-type="view">
            <template slot-scope="{grid, items}">
                <display-items v-for="itm in items" :key="itm.id" :item="itm" :list="items" :model="model" :all-vars="allVars" :nodes-values-dict="nodesValuesDict"/>
            </template>
        </grids-panel>

        <card-panel v-else-if="item.type === 'card'" v-bind="item.options" :id="item.id" :card="item" panel-type="view">
            <template slot-scope="{tab, items}">
                <display-items v-for="itm in items" :key="itm.id" :item="itm" :list="items" :model="model" :all-vars="allVars" :nodes-values-dict="nodesValuesDict"/>
            </template>
        </card-panel>

        <sub-form v-else-if="item.type === 'sub-form'" v-bind="item.options" :type="item.type"
                  :id="item.id" :subs="item.subs" :model="model" :all-vars="allVars" :nodes-values-dict="nodesValuesDict">
        </sub-form>

        <template v-else-if="item.type === 'split-line'">
            <!-- <split-line v-bind="item.options"></split-line> -->
        </template>

        <template v-else>
            <item-html v-bind="item.options" :model="model" :type="item.type" :value="model[item.options.field]" :all-vars="allVars" :nodes-values-dict="nodesValuesDict"></item-html>
        </template>
    </div>
</template>
<script>
    /*--- 渲染组件 ---*/
    import TabsPanel from "../../../src/display/layout/tabs";
    import GridsPanel from "../../../src/display/layout/grids";
    import SplitLine from "../../../src/display/layout/split-line";
    import CardPanel from "../../../src/display/layout/card";
    import SubForm from "../../../src/display/form/sub-form";
    import ItemHtml from "../../../src/display/form";
    import {needShow, GetFormItem} from "../../../src/utils/lib";

    export default {
        inheritAttrs: false,
        name: "display-items",
        components: {
            TabsPanel,
            GridsPanel,
            CardPanel,
            SubForm,
            SplitLine,
            ItemHtml
        },
        props: ["list", "item", "model", "allVars", "nodesValuesDict"],
        data() {
            return {}
        },
        computed: {
            //v-if隐藏
            isShow() {
                let flag = this.item.options.KeepDom || (!this.item.options.hide && needShow(this.item.options.showCondition, this.model));

                //设置表单项像是情况，用于空卡片隐藏布局
                let status = true
                if (this.item.options.KeepDom) {
                    status = false
                } else if (!(this.item.options.KeepDom || (!this.item.options.hide && needShow(this.item.options.showCondition, this.model)))) {
                    status = false
                }
                this.$set(this.item.options, "showStatus", status);

                return flag
            },
            //v-show隐藏
            isShowOfVshow() {
                // return !this.item.options.KeepDom && !this.item.options.hide && needShow(this.item.options.showCondition, this.model)
                if(this.item.options.showCondition && needShow(this.item.options.showCondition, this.model)) {
                    return true
                }
                return !this.item.options.KeepDom
            },
            //当前布局组件下的表单项
            realFormItem() {
                //减少运算，return []
                if(this.item.options.showEmpty) {
                    return []
                }

                let items = [];
                GetFormItem([this.item], items);
                return items;
            },
            isEmptyCardShow() {
                if (this.item.type !== "card" || this.item.options.showEmpty) {
                    return true
                }

                //容器为卡片类型时，内部表单项为空的情况下，隐藏卡片容器
                return this.realFormItem.some(s => {
                    return s.options.showStatus
                })
            }
        },
        methods: {
            needShow(c, m) {
                return needShow(c, m);
            },
        },
    }
</script>
