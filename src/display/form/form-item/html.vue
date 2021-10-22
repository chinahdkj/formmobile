<template>
    <div class="dsp__html" v-html="value"></div>
</template>

<script>
    export default {
        inheritAttrs: false,
        components: {},
        props: ["value"],
        data(){
            return {};
        },
    }
</script>
