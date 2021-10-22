<template>
    <div v-if="PANEL" class="panel-form-design-item" :data-id="item.id"
         :class="{current: PANEL.current && PANEL.current.id === item.id,
         'layout-item': item.classify === 'layout',
         'is-hidden' : item.options.hide}">

        <tabs-design v-if="item.type === 'tabs'" v-bind="item.options" :id="item.id" :tabs="item.tabs"
                     @mousedown.native="handleSetCurrent"
                     @add-item="PANEL.addItem()" @delete-item="onDelete(item.id, list)" :is-design="true">
            <template slot-scope="{tab, items}">
                <design-item v-for="item in items" :key="item.id" :item="item" :list="items"/>
            </template>
        </tabs-design>

        <grids-design v-else-if="item.type === 'grids'" v-bind="item.options" :id="item.id" :cols="item.cols"
                      @mousedown.native="handleSetCurrent" @add-item="PANEL.addItem()"
                      @delete-item="onDelete(item.id, list)" :is-design="true">
            <template slot-scope="{grid, items}">
                <design-item v-for="item in items" :key="item.id" :item="item" :list="items"/>
            </template>
        </grids-design>

        <card-design v-else-if="item.type === 'card'" v-bind="item.options" :id="item.id" :card="item"
                         :is-design="true" @mousedown.native="handleSetCurrent" @add-item="PANEL.addItem()"
                         @delete-item="onDelete(item.id, list)">
            <template slot-scope="{card, items}">
                <design-item v-for="item in items" :key="item.id" :item="item" :list="items"/>
            </template>
        </card-design>

        <sub-form-design v-else-if="item.type === 'sub-form'" v-bind="item.options" :id="item.id" :sub-form="item"
                         :is-design="true" @mousedown.native="handleSetCurrent" @add-item="PANEL.addItem()"
                         @delete-item="onDelete(item.id, list)">
            <template slot-scope="{items, parent}">
                <!--:style="{flex: `0 0 ${sub.options.width || '200px'}`}"-->
                <div v-for="(sub, i) in items" :key="i" class="panel-form-design-item panel-form-design-subform"
                     :class="{current: PANEL.current && PANEL.current.id === sub.id,
                     'layout-item': sub.classify === 'layout', 'is-hidden' : sub.options.hide}">
                    <el-table :data="[{}]" >
                        <el-table-column :prop="sub.id" :label="sub.options.name" :align="item.options.align">
                            <template #header="{column}">
                                <span v-if="sub.options.required" class="must">*</span>
                                {{column.label}}
                            </template>
                            <template slot-scope="scope">
                                <form-item :model="{}" :type="sub.type" v-bind="sub.options" :is-design="true"
                                           :parent-field="item.options.field" :index="0" :parent="parent"></form-item>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="panel-form-design-item__mask" @mousedown.stop="PANEL.setCurrent(sub)">
                        <div class="handles-btns">
                            <i title="删除" @click.stop="onDelete(sub.id, items)"
                               class="el-icon-delete"/>
                        </div>
                    </div>
                </div>
            </template>
        </sub-form-design>

        <template v-else-if="item.type === 'split-line'">
            <split-line v-bind="item.options" :is-design="true"></split-line>
            <div class="panel-form-design-item__mask" @mousedown.stop="PANEL.setCurrent(item)">
                <div class="handles-btns">
                    <i title="删除" @click.stop="onDelete(item.id, list)"
                       class="el-icon-delete"/>
                </div>
            </div>
        </template>

        <template v-else>
            <form-item :model="{}" :type="item.type" v-bind="item.options" :is-design="true"></form-item>
            <div class="panel-form-design-item__mask" @mousedown.stop="PANEL.setCurrent(item)">
                <div class="handles-btns">
                    <i title="删除" @click.stop="onDelete(item.id, list)"
                       class="el-icon-delete"/>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    /*--- 设计器渲染 ---*/
    import TabsDesign from "../../render/layout/tabs";
    import GridsDesign from "../../render/layout/grids";
    import CardDesign from "../../render/layout/card";
    import SubFormDesign from "../../render/layout/sub-form";
    import SplitLine from "../../render/layout/split-line"
    import FormItem from "../../render/form";

    export default {
        inheritAttrs: false,
        name: "design-item",
        props: ["list", "item"],
        inject: {
            PANEL: "PANEL",
        },
        components: {
            TabsDesign, GridsDesign, CardDesign, SubFormDesign, SplitLine, FormItem
        },
        methods: {
            onDelete(id, items) {
                let di = items.findIndex((t) => {
                    return t.id === id;
                });
                if (di === -1) {
                    return;
                }
                this.$confirm("是否要删除该组件", "提示", {
                    type: "warning", showClose: false
                }).then(() => {
                    items.splice(di, 1);
                    this.PANEL.setCurrent(null);
                }).catch((err) => {

                });
            },
            handleSetCurrent(e) {
                e.stopPropagation();
                this.PANEL.setCurrent(this.item);
            }
        },
    }
</script>
