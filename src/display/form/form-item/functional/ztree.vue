<template>
    <div class="dsp__ztree">{{text}}</div>
</template>

<script>
import {formatFromBinding, BindRecords} from "../../../../utils/lib"

    export default {
        name: "DspZtree",
        inheritAttrs: false,
        components: {},
        props: ["value", "field", "model", "dict"],
        data() {
            return {};
        },
        computed: {
            text() {
                let $$text = this.model[`${this.field}$$text`]; //从数据中直取text
                let text = formatFromBinding(this.value, BindRecords(this.dict)); //从字典中取值
                return $$text || text;
            }
        },
    }
</script>
