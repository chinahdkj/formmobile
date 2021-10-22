<template>
    <mue-sound-record v-model="value"
                      :multiple="!!multiple"
                      :disabled="!!disabled"
                      :readonly="!!readonly"
                      :limit="limit"/>
</template>

<script>
    import {strToArr} from '@/utils/lib'

    export default {
        inheritAttrs: false,
        components: {},
        props: [
            "field", "model", "multiple", "disabled", "readonly", "limit", "dataType"
        ],
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
