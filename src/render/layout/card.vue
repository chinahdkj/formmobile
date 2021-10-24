<template>
    <div class="custom-form-group-card">

        <mue-panel :title="title" hairline="none" :class="{'title-line': titleLine}">
            <div class="panel-content">
                <slot :card="card" :items="card.cardItem"></slot>
            </div>
        </mue-panel>

    </div>
</template>
<script>
import BASE from "./base";

export default {
    inheritAttrs: false,
    components: {},
    mixins: [BASE],
    props: [
        "id", "type", "showCondition", "isDesign", "panelType",
        "card", "showTitle", "title", "shadow", "showBorder", "titleLine"
    ],
    data() {
        return {};
    }

};
</script>

<style lang="less">
.custom-form-group-card {
    position: relative;
    margin: 4px 0;

    .mue-panel {
        &.title-line {
            .mue-panel-header {
                border-bottom: solid 1px #dddddd;
            }
        }
    }

}
</style>
