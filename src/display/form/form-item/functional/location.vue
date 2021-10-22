<template>
    <div v-show="value" class="dsp__location" @click.stop="onClickToMap">查看
        <mue-gis-point style="display: none;" ref="pos" v-model="value" readonly></mue-gis-point>
    </div>
</template>

<script>
    export default {
        props: ["value"],
        data(){
            return {};
        },
        methods: {
            onClickToMap: function () {
                this.$refs.pos.showPop();
            },
        }
    };
</script>
