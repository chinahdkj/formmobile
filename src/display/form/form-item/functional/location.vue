<template>
    <div v-show="value" class="dsp__location" @click.stop="onClickToMap">查看
        <mue-gis-point style="display: none;" ref="pos" v-model="value" readonly
                       :gislist="gis" :lhsw="customType === 'lhsw'"></mue-gis-point>
    </div>
</template>

<script>
    export default {
        name: "DspLocation",
        props: ["value", "gislist", "customType"],
        data(){
            return {};
        },
        computed: {
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
            onClickToMap: function () {
                this.$refs.pos.showPop();
            },
        }
    };
</script>
