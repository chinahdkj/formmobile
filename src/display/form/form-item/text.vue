<template>
    <div class="dsp__text" @click="click">
        <span :style="style">{{transValue}}</span> <span v-if="value || value === 0">{{unit}}</span>
    </div>
</template>

<script>
    import {Validate} from "../../../utils/validate"
    import {GetThousandSp} from "../../../utils/lib";
    export default {
        name: "DspText",
        inheritAttrs: false,
        components: {},
        props: ["value", "unit", "dataType", "desensitization", "ndType", "bankCardNumbers", "thousandSp"],
        data(){
            return {};
        },
        computed:{
            isPhone() {
                return /^1([358][0-9]|4[56789]|6[2567]|7[012345678]|9[189])[0-9]{8}$/.test(this.value);
            },
            style() {
                return this.isPhone ? {"text-decoration": "underline"} : null;
            },
            type(){
                return this.dataType ? this.dataType.toLowerCase() : "text";
            },
            transValue(){
                if(this.value == null) {
                    return this.value
                }
                let val = this.value;
                if(this.desensitization) {
                    //手机号脱敏
                    if(val && this.ndType === "mobile" && Validate.checkIsTelephone(val)) {
                        val = val.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2");
                    }

                    //身份证号脱敏
                    if(val && this.ndType === "idCard" && Validate.checkIsIdcard(val)) {
                        val = val.replace(/^(.{8})(?:\d+)(.{4})$/, "$1******$2");
                    }

                    //银行卡脱敏
                    if(val && this.ndType === "bank") {
                        if(this.bankCardNumbers === 16 && Validate.checkIsBankCard16(val)) {
                            val = val.replace(/^(.{6})(?:\d+)(.{4})$/, "$1******$2");
                        } else if(this.bankCardNumbers === 19 && Validate.checkIsBankCard19(val)){
                            val = val.replace(/^(.{6})(?:\d+)(.{4})$/, "$1*********$2");
                        }
                    }
                }
                if(val && this.thousandSp) {
                    return GetThousandSp(val);
                }
                return this.type === "number" ? Number(val) : val
            }
        },
        methods: {
            click(){
                if (this.isPhone) {
                    this.$comm.makeCall(this.value);
                }
            }
        }
    }
</script>
