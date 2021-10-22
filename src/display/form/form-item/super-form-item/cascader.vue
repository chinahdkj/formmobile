<template>
    <div class="dsp__cascader">{{text}}</div>
</template>

<script>
import {formatFromBinding} from "../../../../utils/lib"

    export default {
        inheritAttrs: false,
        components: {},
        props: ["value", "field", "model", "dict"],
        data() {
            return {};
        },
        computed: {
            text() {
                let $$text = this.model[`${this.field}$$text`]; //从数据中直取text
                let text = formatFromBinding(this.value, this.__BindRecords(this.dict)); //从字典中取值
                return $$text || text;
            }
        },
    }
</script>
