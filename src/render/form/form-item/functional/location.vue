<template>
    <mue-gis-point v-model="value"
                   @on-confirm="onConfirm"
                   :readonly="!!disabled"
                   :current-location="!!currentLocation"
                   :gislist="gis"
                   :lhsw="customType === 'lhsw'">
    </mue-gis-point>
</template>

<script>
export default {
    inheritAttrs: false,
    components: {},
    props: [
        "field", "model", "disabled", "required", "defaultValue", "center", "saveFields",
        "currentLocation", "gislist", "customType"
    ],
    data() {
        return {};
    },
    computed: {
        value: {
            get(){
                return this.model[this.field];
            },
            set(nv){
                this.$set(this.model, this.field, nv);
            }
        },
        gis() {
            if(!this.gislist) {
                return null
            }
            try {
                return JSON.parse(this.gislist)
            } catch (e) {
                console.log(e);
                return null
            }
        }
    },
    methods: {
        onConfirm(pos, address) {
            if(!address || !address.addressComponent || !address.formatted_address) {
                return
            }
            this.autoComplateFields(address)
        },
        autoComplateFields({addressComponent, formatted_address}) {
            (this.saveFields || []).forEach((f)=>{
                if(!f.field || !f.mobileField){
                    return;
                }
                if(f.field === 'address') {
                    this.$set(this.model, f.mobileField, String(formatted_address));
                    return;
                }
                if(!(f.field in addressComponent)) {
                    this.$set(this.model, f.mobileField, "");
                    return
                }
                let v = addressComponent[f.field];
                this.$set(this.model, f.mobileField, v);
            });
        }
    }
}
</script>
