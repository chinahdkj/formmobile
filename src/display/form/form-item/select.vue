<template>
    <div class="dsp__select">
        {{text}}
    </div>
</template>

<script>
    import {formatFromBinding} from "../../../utils/lib"

    export default {
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
                    text = formatFromBinding(this.value, this.__BindRecords(this.optionsDict))
                } else {
                    text = formatFromBinding(this.value, this.bindings)
                }
                return $$text || text;
            }
        },
    }
</script>
