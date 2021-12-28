<template>
    <div class="dsp__text">
        {{value}}
    </div>
</template>

<script>
    export default {
        name: "DspText",
        inheritAttrs: false,
        components: {},
        props: ["value"],
        data(){
            return {};
        },
    }
</script>
