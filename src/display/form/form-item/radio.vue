<template>
    <div class="dsp__radio">
        {{text}}
    </div>
</template>

<script>
    import {formatFromBinding, BindRecords} from "../../../utils/lib"

    export default {
        name: "DspRadio",
        inheritAttrs: false,
        components: {},
        props: ["value", "field", "bindings", "model", "optionsType", "optionsDict"],
        data() {
            return {};
        },
        computed: {
            text() {
                let $$text = this.model[`${this.field}$$text`]; //从数据中直取text
                let text = "";
                if(this.optionsType === "dynamic") {
                    text = formatFromBinding(String(this.value), BindRecords(this.optionsDict))
                } else {
                    text = formatFromBinding(String(this.value), this.bindings)
                }
                return $$text || text;
            }
        },
    }
</script>
