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
import { deepClone, needShow } from '../../utils/lib'
export default {
    inject: {
        PREVIEW: {
            from: "PREVIEW",
            default: null
        },
    },
    name: "DspCardPanel",
    inheritAttrs: false,
    components: {},
    mixins: [BASE],
    props: [
        "id", "type", "showCondition", "isDesign", "panelType",
        "card", "showTitle", "title", "shadow", "showBorder", "titleLine",
        "isCuttle", "cuttleCondition",
    ],
    data() {
        return {
            openStatus: true
        };
    },
    computed: {
        cnd() {
            let model = this.PREVIEW && this.PREVIEW.model ? deepClone(this.PREVIEW.model) : {}
            return needShow(this.cuttleCondition, model)
        }
    },
    watch: {
        cnd: {
            immediate: true, handler(v) {
                this.openStatus = v;
            }
        }
    },
    methods:{
        toggleCard() {
            this.openStatus = !this.openStatus;
        }
    }

};
</script>

<style lang="less">
.custom-form-group-card {
    position: relative;
    margin: 4px 0;

    .mue-panel {
        .mue-panel-header {
            border-bottom: solid 1px #dddddd;
        }
        .mue-panel-body{
            overflow: unset;
        }
    }

}
</style>
