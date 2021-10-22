<template>
    <div class="dsp__rate">
        <van-rate v-model="text" color="#ffd21e" readonly allow-half v-bind="$attrs"/>
    </div>
</template>

<script>
    export default {
        components: {},
        props: ["value", "disabled"],
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
