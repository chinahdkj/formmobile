<template>
    <div class="custom-form-group-tabs">

        <van-tabs class="no-flex-left">
            <van-tab v-for="(t, i) in tabs" :key="i" :title="t.name" :name="t.value">
                <slot :tab="t" :items="t.children"></slot>
            </van-tab>
        </van-tabs>

    </div>
</template>
<script>
import BASE from "./base";

export default {
    inheritAttrs: false,
    components: {},
    mixins: [BASE],
    props: ["tabs", "id", "type", "position", "panelType", "showCondition", "isDesign"],
    data() {
        return {};
    },
    computed: {},
    watch: {},
};
</script>

<style lang="less">
.custom-form-group-tabs {
    position: relative;
    margin: 4px 0;
}

</style>
