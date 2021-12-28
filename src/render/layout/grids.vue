<template>
    <div class="custom-form-group-grids">

        <div v-for="(col, i) in cols" :key="i">
            <div class="grid-content">
                <slot :grid="col" :items="col.children"></slot>
            </div>
        </div>

    </div>
</template>
<script>
import BASE from "./base";

export default {
    name: "GridsPanel",
    inheritAttrs: false,
    components: {},
    mixins: [BASE],
    //panelType = 'view' 为非设计模式
    props: ["id", "cols", "gutter", "panelType", "showCondition", "isDesign"],
    data() {
        return {};
    }
};
</script>

<style lang="less">
.custom-form-group-grids {
    position: relative;
    width: 100%;
}
</style>
