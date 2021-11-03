<template>
    <div class="dsp__date-range-picker">
        {{ text }}
    </div>
</template>

<script>
import {GetFormatString} from "../../../utils/lib";

export default {
    inheritAttrs: false,
    components: {},
    props: ["value", "format", "isTimestamp"],
    data() {
        return {};
    },
    computed: {
        fmt() {
            return GetFormatString(this.format);
        },
        text() {
            if(!this.value){
                return "";
            }
            if(!this.isTimestamp) {
                if(Array.isArray(this.value)) {
                    return this.value.join(",");
                }
                return this.value;
            } else {
                return this.unixToString(this.value, this.fmt);
            }
        }
    },
    methods: {
        unixToString(date, format) {
            if(Array.isArray(date)) {
                let vals = date.map(m => moment.unix(m).format(format));
                return vals.join(",");
            }
            let arr = date.split(",");
            return arr.map(m => moment.unix(Number(m)).format(format)).join(",")
        }
    }
}
</script>
