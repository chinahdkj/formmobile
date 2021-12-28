<template>
    <div class="dsp__word" :style="{...textStyle, ...custom}">
        {{value}}
    </div>
</template>

<script>
    export default {
        name: "DspWord",
        components: {},
        props: ["value", "fontSize", "fontWeight", "color", "customStyle"],
        data() {
            return {};
        },
        computed: {
            textStyle() {
                return {
                    fontSize: this.fontSize || null,
                    fontWeight: this.fontWeight || null,
                    color: this.color || null,
                }
            },
            custom(){
                let customStyle = {};
                if(Array.isArray(this.customStyle) && this.customStyle.length) {
                    this.customStyle.forEach(f => {
                        customStyle[f.name] = f.value;
                    })
                }
                return customStyle;
            },
        }
    }
</script>
