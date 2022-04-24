<template>
    <div class="dsp__slider">
        <van-slider v-model="text" disabled v-bind="$attrs" />
    </div>
</template>

<script>
    export default {
        name: "DspSlider",
        components: {},
        props: ["value"],
        data() {
            return {};
        },
        computed: {
            text() {
                if (this.value == null) {
                    return 0;
                }
                return Number(this.value || 0);
            }
        }
    }
</script>

<style lang="less">
    .dsp__slider {
        .el-slider {
            width: 100%;
            .el-slider__runway {
                margin: 11px 0;
            }
        }
        .el-slider__runway.disabled .el-slider__bar {
            background-color: #4698eb;
        }
    }
    .is-label-line {
        .dsp__slider.value{
            padding:  0 0 10px;
        }
    }
</style>
