<template>
    <mue-signature v-model="value"
                   :readonly="!!readonly"
                   :disabled="!!disabled">

    </mue-signature>
</template>

<script>
    import {strToArr} from '../../../../utils/lib'

    export default {
        name: "FtmSignature",
        inheritAttrs: false,
        components: {},
        props: [
            "field", "model", "readonly", "disabled"
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
                this.$set(this.model, this.field, temp.length === 0 ? null : temp.join(","));
            }
        }
    }
</script>
