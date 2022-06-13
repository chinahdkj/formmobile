<template>
    <div v-if="isShow" v-show="isShowOfVshow" class="panel-form-item-display" :data-id="item.id">
        <tabs-panel v-if="item.type === 'tabs'" v-bind="item.options" :id="item.id" :tabs="item.tabs" :model="model" panel-type="view">
            <template slot-scope="{tab, items}">
                <display-items v-for="itm in items" :key="itm.id" :item="itm" :list="items" :model="model"/>
            </template>
        </tabs-panel>

        <grids-panel v-else-if="item.type === 'grids'" v-bind="item.options" :id="item.id" :cols="item.cols" panel-type="view">
            <template slot-scope="{grid, items}">
                <display-items v-for="itm in items" :key="itm.id" :item="itm" :list="items" :model="model"/>
            </template>
        </grids-panel>

        <card-panel v-else-if="item.type === 'card'" v-bind="item.options" :id="item.id" :card="item" panel-type="view">
            <template slot-scope="{tab, items}">
                <display-items v-for="itm in items" :key="itm.id" :item="itm" :list="items" :model="model"/>
            </template>
        </card-panel>

        <sub-form v-else-if="item.type === 'sub-form'" v-bind="item.options" :type="item.type"
                  :id="item.id" :subs="item.subs" :model="model">
        </sub-form>

        <template v-else-if="item.type === 'split-line'">
            <!-- <split-line v-bind="item.options"></split-line> -->
        </template>

        <template v-else>
            <item-html v-bind="item.options" :model="model" :type="item.type" :value="model[item.options.field]"></item-html>
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
    import {needShow} from "../../../src/utils/lib";

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
        props: ["list", "item", "model"],
        data() {
            return {}
        },
        computed: {
            //v-if隐藏
            isShow() {
                return this.item.options.KeepDom || (!this.item.options.hide && needShow(this.item.options.showCondition, this.model))
            },
            //v-show隐藏
            isShowOfVshow() {
                return !this.item.options.KeepDom && !this.item.options.hide && needShow(this.item.options.showCondition, this.model)
            }
        },
        methods: {
            needShow(c, m) {
                return needShow(c, m);
            },
        },
    }
</script>
