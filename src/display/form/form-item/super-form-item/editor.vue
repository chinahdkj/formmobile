<template>
    <div class="dsp__editor" v-html="value"></div>
</template>

<script>
    export default {
        name: "DspEditor",
        inheritAttrs: false,
        components: {},
        props: ["value"],
        data(){
            return {};
        },
    }
</script>
