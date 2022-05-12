<template>
    <div v-if="isShow" v-show="isShowOfVshow" class="panel-form-item" :data-id="item.id">
        <tabs-panel v-if="item.type === 'tabs'" v-bind="item.options" :id="item.id" :tabs="item.tabs" panel-type="view">
            <template slot-scope="{tab, items}">
                <form-items v-for="item in items" :key="item.id" :item="item" :list="items" :is-new="isNew" :all-vars="allVars" :global-disabled="!!globalDisabled"/>
            </template>
        </tabs-panel>

        <grids-panel v-else-if="item.type === 'grids'" v-bind="item.options" :id="item.id" :cols="item.cols" panel-type="view">
            <template slot-scope="{grid, items}">
                <form-items v-for="item in items" :key="item.id" :item="item" :list="items" :is-new="isNew" :all-vars="allVars" :global-disabled="!!globalDisabled"/>
            </template>
        </grids-panel>

        <card-panel v-else-if="item.type === 'card'" v-bind="item.options" :id="item.id" :card="item" panel-type="view">
            <template slot-scope="{tab, items}">
                <form-items v-for="item in items" :key="item.id" :item="item" :list="items" :is-new="isNew" :all-vars="allVars" :global-disabled="!!globalDisabled"/>
            </template>
        </card-panel>

        <!-- 子表单参数区别于设计模式 -->
        <sub-form v-else-if="item.type === 'sub-form'" v-bind="item.options"
                  :id="item.id" :subs="item.subs" :model="PREVIEW.model" :is-new="isNew" :all-vars="allVars" :global-disabled="!!globalDisabled">
        </sub-form>

        <template v-else-if="item.type === 'split-line'">
            <!-- <split-line v-bind="item.options"></split-line> -->
        </template>

        <template v-else>
            <item :model="PREVIEW.model" :type="item.type" v-bind="item.options" :is-new="isNew" :all-vars="allVars" :global-disabled="!!globalDisabled"></item>
        </template>
    </div>
</template>
<script>
    /*--- 渲染组件 ---*/
    import TabsPanel from "../../../src/render/layout/tabs";
    import GridsPanel from "../../../src/render/layout/grids";
    import SplitLine from "../../../src/render/layout/split-line";
    import CardPanel from "../../../src/render/layout/card";
    import SubForm from "../../../src/render/form/sub-form"
    import Item from "../../../src/render/form";
    import {needShow} from "../../../src/utils/lib";

    export default {
        inheritAttrs: false,
        name: "form-items",
        components: {
            TabsPanel,
            GridsPanel,
            CardPanel,
            SubForm,
            SplitLine,
            Item
        },
        inject: {
            PREVIEW: "PREVIEW"
        },
        props: ["list", "item", "isNew", "allVars", "globalDisabled"],
        data() {
            return {}
        },
        computed: {
            //v-if隐藏
            isShow() {
                return this.item.options.KeepDom || (this.PREVIEW && !this.item.options.hide && needShow(this.item.options.showCondition, this.PREVIEW.model))
            },
            //v-show隐藏
            isShowOfVshow() {
                return !this.item.options.KeepDom && this.PREVIEW && !this.item.options.hide && needShow(this.item.options.showCondition, this.PREVIEW.model)
            }
        },
        methods: {
            needShow(c, m) {
                return needShow(c, m);
            },
        },
    }
</script>
