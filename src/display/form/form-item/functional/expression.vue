<template>
    <div class="dsp__expression">
        {{value}}
    </div>
</template>

<script>
    export default {
        name: "DspExpression",
        inheritAttrs: false,
        components: {},
        props: ["value"],
        data(){
            return {};
        },
    }
</script>
