<template>
    <mue-upload v-model="value"
                :quality="0.8"
                :limit="9"
                :multiple="!!multiple"
                :readonly="!!disabled"
                :accept="accept"
                :is-download="!!isDownload">
    </mue-upload>
</template>

<script>
import {strToArr} from "../../../../utils/lib";
export default {
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "dataType", "disabled", "required",
        "defaultValue", "multiple", "placeholder", "accept", "isDownload"],
    data() {
        return {};
    },
    computed: {
        value: {
            get() {
                let v = this.model[this.field];
                if(Array.isArray(v)) return v;
                return strToArr(v)
            },
            set(nv) {
                this.commitValue(Array.isArray(nv) ? nv : strToArr(nv));
            }
        },
    },
    methods: {
        commitValue(v) {
            let temp = v || [];
            if(this.dataType === "Array") {
                this.$set(this.model, this.field, temp.length === 0 ? null : temp);
            } else {
                this.$set(this.model, this.field, temp.length === 0 ? null : temp.join(","));
            }
        }
    }
}
</script>
