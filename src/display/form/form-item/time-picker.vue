<template>
    <div class="dsp__time-picker">
        {{text}}
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        components: {},
        props: ["value"],
        data() {
            return {};
        },
        computed: {
            text() {
                if(!this.value){
                    return "";
                }
                return this.value;
            }
        },
    }
</script>
