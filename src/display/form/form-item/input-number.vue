<template>
    <div class="dsp__input-number">
        {{text}}
    </div>
</template>

<script>
    export default {
        name: "DspInputNumber",
        inheritAttrs: false,
        components: {},
        props: ["value"],
        data() {
            return {};
        },
        computed: {
            text() {
                return this.value || 0;
            }
        },
    }
</script>
