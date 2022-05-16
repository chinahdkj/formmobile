<template>
    <div class="custom-form-group-tabs">

        <van-tabs class="no-flex-left">
            <van-tab v-for="(t, i) in showTabs" :key="i" :title="t.name" :name="t.value">
                <slot :tab="t" :items="t.children"></slot>
            </van-tab>
        </van-tabs>

    </div>
</template>
<script>
import BASE from "./base";
import { needShow } from "../../../src/utils/lib";

export default {
    name: "DspTabsPanel",
    inheritAttrs: false,
    components: {},
    mixins: [BASE],
    props: ["tabs", "id", "model", "type", "position", "panelType", "showCondition", "isDesign"],
    data() {
        return {};
    },
    computed: {
        showTabs() {
            return this.tabs.filter(f => {
                return this.isShowTab(f.showCondition);
            })
        }
    },
    watch: {
        showTabs: {
            handler(v) {
                if((v || []).length) {
                    this.current = v[0].value;
                }
            }
        }
    },
    methods: {
        isShowTab(condition) {
            return needShow(condition, this.model)
        }
    }
};
</script>

<style lang="less">
.custom-form-group-tabs {
    position: relative;
    margin: 4px 0;
}

</style>
