<template>
    <mue-upload v-model="value"
                :quality="0.8"
                :limit="9"
                :multiple="!!multiple"
                :readonly="!!disabled"
                :accept="accept"
                :is-download="!!isDownload"
                @input="onChange">
    </mue-upload>
</template>

<script>
import {strToArr} from "../../../../utils/lib";
export default {
    name: "FtmFile",
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "dataType", "disabled", "required", "vars",
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
        },
        onChange(v) {
            if(this.valChange) {
                try {
                    let val = v;
                    let model = this.model;
                    let vars = this.vars;
                    let _this = this;
                    eval(this.valChange);
                } catch (e) {
                    console.info(e)
                }
            }
        },
    }
}
</script>
