<template>
    <div class="dsp__expression">
        {{value}}{{unit}}
    </div>
</template>

<script>
    export default {
        name: "DspExpression",
        inheritAttrs: false,
        components: {},
        props: ["value", "unit"],
        data(){
            return {};
        },
    }
</script>
