<template>
    <div class="dsp__date-range-picker">
        {{ text }}
    </div>
</template>

<script>

export default {
    inheritAttrs: false,
    components: {},
    props: ["value"],
    data() {
        return {};
    },
    computed: {
        text() {
            if(!this.value){
                return "";
            }
            if(Array.isArray(this.value)) {
                return this.value.join(",");
            }
            return this.value;
        }
    },
}
</script>
