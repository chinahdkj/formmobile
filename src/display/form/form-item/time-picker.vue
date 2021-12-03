<template>
    <div class="dsp__time-picker">
        {{ text }}
    </div>
</template>

<script>
import {DateFormat} from "../../../utils/lib"

export default {
    inheritAttrs: false,
    components: {},
    props: ["value", "format"],
    data() {
        return {};
    },
    computed: {
        text() {
            return DateFormat(this.value, this.format);
        }
    },
}
</script>
