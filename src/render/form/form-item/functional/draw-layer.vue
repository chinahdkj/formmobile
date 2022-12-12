<template>
    <mue-gis-draw-layer v-model="value" :options="options" :gwt-option="gwt" :type="polyType || 'polygon'"
                        :off-option="offOpts" :disabled="!!disabled" :readonly="!!readonly"/>
</template>

<script>
    export default {
        name: "FtmDrawLayer",
        inheritAttrs: false,
        components: {},
        props: [
            "field", "model", "defaultValue", "center", "gwtOption", "disabled", "readonly", "offOption", "zoom",
            "polyType"
        ],
        data() {
            return {};
        },
        computed: {
            value: {
                get(){
                    let v = this.model[this.field];
                    let vv = Array.isArray(v) || !v ? v : JSON.parse(v)
                    return vv;
                },
                set(nv){
                    this.$set(this.model, this.field, nv);
                }
            },
            gwt() {
                if(!this.gwtOption) {
                    return {}
                }
                try {
                    let obj = JSON.parse(this.gwtOption)
                    return obj;
                } catch (e) {
                    console.error(e);
                    return {}
                }
            },
            offOpts() {
                if(!this.offOption) {
                    return {}
                }
                try {
                    let obj = JSON.parse(this.offOption)
                    return obj;
                } catch (e) {
                    console.error(e);
                    return {}
                }
            },
            options() {
                let options = {
                    gis:{}
                }
                if(this.center) {
                    options.gis.center = this.center.split(',')
                }
                if(this.zoom) {
                    options.gis.zoom = Number(this.zoom) || 8;
                }
                return options
            }
        },
        methods: {
        }
    }
</script>
