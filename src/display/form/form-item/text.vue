<template>
    <div class="dsp__text">
        {{value}}{{unit}}
    </div>
</template>

<script>
    export default {
        name: "DspText",
        inheritAttrs: false,
        components: {},
        props: ["value", "unit"],
        data(){
            return {};
        },
    }
</script>
