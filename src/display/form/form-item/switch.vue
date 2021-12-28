<template>
    <div class="dsp__switch">
        {{text}}
    </div>
</template>

<script>
    export default {
        name: "DspSwitch",
        inheritAttrs: false,
        components: {},
        props: ["value"],
        data() {
            return {};
        },
        computed: {
            text() {
                if(this.value == null){
                    return "";
                }
                return Number(JSON.parse(this.value) || 0) ? "是" : "否";
            }
        },
    }
</script>
