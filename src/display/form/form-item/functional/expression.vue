<template>
    <div class="dsp__expression">
        {{text}} <span v-if="value || value === 0">{{unit}}</span>
    </div>
</template>

<script>
    export default {
        name: "DspExpression",
        inheritAttrs: false,
        components: {},
        props: ["value", "unit", "thousandSp"],
        data(){
            return {};
        },
        computed: {
            text() {
                if(!!this.thousandSp) {
                    return Number(this.value).toLocaleString()
                }
                return this.value
            }
        }
    }
</script>
