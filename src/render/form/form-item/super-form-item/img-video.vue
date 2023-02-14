<template>
    <mue-img-upload
        v-model="value"
        :quality="0.8"
        :limit="limit"
        :multiple="!!multiple"
        :disabled="!!disabled"
        :readonly="!!readonly"
        :upload-accpet="uploadAccept"
        accept="all"
        @input="onChange">
    </mue-img-upload>
</template>

<script>
import {strToArr} from '../../../../utils/lib'
import BASE from "../base";
export default {
    mixins: [BASE],
    name: "FtmImgVideo",
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "dataType", "readonly", "disabled", "required", "vars",
        "defaultValue", "multiple", "accept", "thumbZip", "isComment", "limit", "valChange", "uploadAccept"],
    data() {
        return {};
    },
    computed: {
        value: {
            get() {
                let v = this.model[this.field];
                if (Array.isArray(v)) return v;
                return strToArr(v)
            },
            set(nv) {
                this.commitValue(Array.isArray(nv) ? nv : strToArr(nv));
            }
        },
        FORMRENDER_TOKEN(){
            return sessionStorage.getItem('authortoken') || ''
        },
    },
    methods: {
        commitValue(v) {
            let temp = v || [];
            if (this.dataType === "Array") {
                this.$set(this.model, this.field, temp.length === 0 ? null : temp);
            } else {
                this.$set(this.model, this.field, temp.length === 0 ? null : temp.join(","));
            }
        },
        onChange(v) {
            this.evalValChange(v);
        }
    }
}
</script>
