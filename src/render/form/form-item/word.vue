<template>
    <span class="fpt__word_text" :style="{...textStyle, ...custom}">{{value}}</span>
</template>

<script>
    export default {
        inheritAttrs: false,
        components: {},
        props: ["field", "model", "disabled", "defaultValue", "fontSize", "fontWeight", "color", "customStyle"],
        data() {
            return {};
        },
        computed: {
            value: {
                get() {
                    return this.model[this.field];

                },
                set(nv) {
                    this.$set(this.model, this.field, nv);
                }
            },
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

<style lang="less">
.fpt__word {
    .fpt__word_text {
        height: 30px;
        line-height: 30px;
    }
}
</style>
