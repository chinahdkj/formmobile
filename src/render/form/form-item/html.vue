<template>
    <mue-textarea v-model="value"
                  :rows="5"
                  :readonly="!!readonly"
                  :clearable="!required"
                  :disabled="!!disabled"
                  v-bind="$attrs">
    </mue-textarea>
</template>

<script>
export default {
    name: "FtmHtml",
    components: {},
    props: ["field", "model", "readonly", "disabled", "required", "defaultValue", "rows"],
    data(){
        return {};
    },
    computed: {
        value: {
            get(){
                return this.model[this.field];
            },
            set(nv){
                this.$set(this.model, this.field, String(nv || "").trim());
            }
        },
    },
    watch: {
    },
    methods: {
    }
}
</script>