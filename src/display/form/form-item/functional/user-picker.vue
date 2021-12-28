<template>
    <div class="dsp__user-picker">{{text}}</div>
</template>

<script>
    export default {
        name: "DspUserPicker",
        inheritAttrs: false,
        components: {},
        props: ["value", "field", "bindings", "model", "dict"],
        data() {
            return {};
        },
        computed: {
            text() {
                return this.model[`${this.field}$$text`] || "";
            }
        },
    }
</script>
