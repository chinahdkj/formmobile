<template>
    <mue-img-upload :limit="limit" accept="watermark" :disabled="!!disabled"
                    :multiple="!!multiple" v-model="value" :readonly="!!readonly"></mue-img-upload>
</template>

<script>
    import {strToArr} from '../../../../utils/lib'

    export default {
        name: "FtmWaterMarkingCamera",
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "dataType", "readonly", "disabled", "required",
            "defaultValue", "multiple", "limit"],
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
        },
        methods: {
            commitValue(v) {
                let temp = v || [];
                if (this.dataType === "Array") {
                    this.$set(this.model, this.field, temp.length === 0 ? null : temp);
                } else {
                    this.$set(this.model, this.field, temp.length === 0 ? null : temp.join(","));
                }
            }
        }
    }
</script>
