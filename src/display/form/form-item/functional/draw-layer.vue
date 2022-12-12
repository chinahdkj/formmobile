<template>
    <span class="dsp__draw-layer">
        <van-button v-if="value" size="mini" native-type="button" @click.stop="handleShow">查看</van-button>
        <mue-gis-draw-layer ref="gisDraw" :disabled="true" :readonly="true" v-show="false" v-model="val"
                            :options="options" :type="polyType || 'polygon'" :gwt-option="gwt" :off-option="offOpts" />
    </span>
</template>

<script>
export default {
    name: "DspDrawLayer",
    props: ["value", "center", "gwtOption", "offOption", "zoom", "polyType"],
    data(){
        return {visible: false};
    },
    computed: {
        val() {
            return Array.isArray(this.value) || !this.value ? this.value : JSON.parse(this.value)
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
        handleShow() {
            this.$refs.gisDraw.pop = true
        }
    }
};
</script>