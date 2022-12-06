<template>
    <div v-if="isShow" v-show="isShowOfVshow && isEmptyCardShow" class="panel-form-item" :data-id="item.id">
        <tabs-panel v-if="item.type === 'tabs'" v-bind="item.options" :id="item.id" :tabs="item.tabs" :model="PREVIEW.model" panel-type="view">
            <template slot-scope="{tab, items}">
                <form-items v-for="item in items" :key="item.id" :item="item" :list="items" :is-new="isNew" :model="PREVIEW.model" :all-vars="allVars" :nodes-values-dict="nodesValuesDict" :global-disabled="!!globalDisabled" :authority="authority" :task-info="taskInfo"/>
            </template>
        </tabs-panel>

        <grids-panel v-else-if="item.type === 'grids'" v-bind="item.options" :id="item.id" :cols="item.cols" panel-type="view">
            <template slot-scope="{grid, items}">
                <form-items v-for="item in items" :key="item.id" :item="item" :list="items" :is-new="isNew" :model="PREVIEW.model" :all-vars="allVars" :nodes-values-dict="nodesValuesDict" :global-disabled="!!globalDisabled" :authority="authority" :task-info="taskInfo"/>
            </template>
        </grids-panel>

        <card-panel v-else-if="item.type === 'card'" v-bind="item.options" :id="item.id" :card="item" panel-type="view">
            <template slot-scope="{tab, items}">
                <form-items v-for="item in items" :key="item.id" :item="item" :list="items" :is-new="isNew" :model="PREVIEW.model" :all-vars="allVars" :nodes-values-dict="nodesValuesDict" :global-disabled="!!globalDisabled" :authority="authority" :task-info="taskInfo"/>
            </template>
        </card-panel>

        <!-- 子表单参数区别于设计模式 -->
        <sub-form v-else-if="item.type === 'sub-form'" v-bind="item.options" :type="item.type"
                  :id="item.id" :subs="item.subs" :model="PREVIEW.model" :is-new="isNew" :all-vars="allVars" :nodes-values-dict="nodesValuesDict" :global-disabled="!!globalDisabled" :authority="authority" :task-info="taskInfo">
        </sub-form>

        <template v-else-if="item.type === 'split-line'">
            <!-- <split-line v-bind="item.options"></split-line> -->
        </template>

        <template v-else>
            <item :model="PREVIEW.model" :type="item.type" v-bind="item.options" :is-new="isNew" :all-vars="allVars" :nodes-values-dict="nodesValuesDict" :global-disabled="!!globalDisabled" :authority="authority" :task-info="taskInfo"/>
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
    import {needShow, GetFormItem} from "../../../src/utils/lib";
    import Authority from "../../../src/components/authority"

    export default {
        mixins: [Authority], //混入表单权限，取currentFieldAuth 当前字段权限对象
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
        props: ["list", "item", "model", "isNew", "allVars","nodesValuesDict", "globalDisabled", "authority", "taskInfo"],
        data() {
            return {}
        },
        computed: {
            //v-if隐藏
            isShow() {
                let flag = this.item.options.KeepDom
                    || (this.PREVIEW && !this.item.options.hide && needShow(this.item.options.showCondition, this.PREVIEW.model) && !this.currentFieldAuth.hide)

                //设置表单项像是情况，用于空卡片隐藏布局
                let status = true
                if (this.item.options.KeepDom) {
                    status = false
                } else if (!(this.PREVIEW && !this.item.options.hide && needShow(this.item.options.showCondition, this.PREVIEW.model) && !this.currentFieldAuth.hide)) {
                    status = false
                }
                this.$set(this.item.options, "showStatus", status);

                return flag
            },
            //v-show隐藏
            isShowOfVshow() {
                if(this.PREVIEW && this.item.options.showCondition && needShow(this.item.options.showCondition, this.PREVIEW.model)) {
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
