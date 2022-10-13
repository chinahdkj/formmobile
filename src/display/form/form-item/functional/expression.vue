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
        props: ["value", "unit", "thousandSp", "decimalLength"],
        data(){
            return {};
        },
        computed: {
            text() {
              let v = this.value;
              //保留几位小数
              if (v != null && this.decimalLength) {
                  v = Number(Number(v).toFixed(this.decimalLength))
              }
              if (v != null && !!this.thousandSp) {
                  v = Number(v).toLocaleString()
              }
              return v
            }
        }
    }
</script>
