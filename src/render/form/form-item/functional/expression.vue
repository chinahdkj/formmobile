<template>
    <mue-input v-model="value" readonly :icon="error ? 'icon-yichang-weixuan' : ''"
               :disabled="!!disabled" v-bind="$attrs" @blur="onBlur">
        <template v-if="unit" slot="suffix">{{unit}}</template>
    </mue-input>
</template>

<script>
    import { changeNumMoneyToChinese, ReplaceFields, deepClone } from '../../../../utils/lib'
    export default {
        name: "FtmExpression",
        inheritAttrs: false,
        components: {},
        props: [
            "field", "model", "disabled", "expression", "autoFields", "inputable", "vars", "unit", "errMessage",
            "parentField", "rowIndex", "dataType", "decimalLength", "thousandSp"
        ],
        data() {
            return {
                value: null, error: false
            };
        },
        computed: {
            errMsg() {
                return this.errMessage ? this.errMessage : "表达式出错"
            },
            //直接监听model拿不到新旧值差异，属于vue2.0 watch 深度监听同源问题
            formModel() {
                return JSON.parse(JSON.stringify(this.model || {}))
            },
            varsModel() {
                return JSON.parse(JSON.stringify(this.vars || {}))
            }
        },
        watch: {
            //当前表单或子表行数据
            formModel: {
                immediate: true, deep: true,
                handler(v, ov) {
                    if(this.vars || !v)
                        return

                    //处理watch触发两次问题
                    if(this.field in v) {
                        delete v[this.field];
                    }
                    if(ov && (this.field in ov)) {
                        delete ov[this.field];
                    }
                    if(JSON.stringify(v) === JSON.stringify(ov)) {
                        return
                    }

                    this.modelChange();
                }
            },
            //当为子表中的表单项时，vars为整个表单的数据
            varsModel: {
                immediate: true, deep: true,
                handler(v, ov) {
                    if(!v || !Object.keys(v).length)
                        return

                    (v[this.parentField] || []).forEach(f => {
                        if(this.field in f) {
                            delete f[this.field];
                        }
                    });

                    if(ov) {
                        (ov[this.parentField] || []).forEach(f => {
                            if(this.field in f) {
                                delete f[this.field];
                            }
                        });
                    }

                    if(JSON.stringify(v) === JSON.stringify(ov)) {
                        return
                    }

                    this.modelChange();
                }
            },
            // value: {
            //     immediate: true, deep: true, handler(v, ov) {
            //
            //     }
            // },
        },
        methods: {
            modelChange() {
                // 判断 ${field}
                if (!/\$\{\S+\}/.test(this.expression)) {
                    this.value = this.expression;
                    // this.$set(this.model, this.field, this.value);
                    return;
                }

                let ChineseMoney = changeNumMoneyToChinese;

                try {
                    let model = deepClone(this.model);
                    let vars = deepClone(this.vars || {});
                    let rowIndex = this.rowIndex;

                    if (/return\s+/.test(this.expression)) {
                        // let es = this.expression.replace(/\$\{(\S+)\}/g, `vars["$1"]`);
                        // let es = this.expression.replace(/\$\{([^.]|\n)+?\}/g, `model["$1"]`);
                        // es.replace(/\$\{parent.([^.]|\n)+?\}/g, `vars["$1"]`);
                        let es = ReplaceFields(this.expression);
                        console.log("expression", es);
                        this.value = eval(`(function () {
                                ${es};
                            })()`);
                        this.setVal(this.value);
                    }
                    if (!this.value && (this.value !== "" && this.value !== 0)) {
                        this.value = null;
                        this.$set(this.model, this.field, this.value);
                    }
                    this.error = false;

                } catch (e) {
                    console.info(e);
                    this.value = null;
                    this.$set(this.model, this.field, this.value);
                    this.error = true;
                }
            },
            setVal(v) {
                let vv = v;

                //保留几位小数
                if(vv != null && this.decimalLength) {
                    vv = Number(Number(vv).toFixed(this.decimalLength))
                    this.value = vv;
                    // vv = this.dataType === "Number" ? Number(vv) : String(v)
                    // this.$set(this.model, this.field, vv);
                    // return
                }

                if(vv != null && !!this.thousandSp) {
                    let temp;
                    if(typeof vv === "string") {
                        temp = vv.includes(",") ? vv : Number(vv).toLocaleString();
                    } else {
                        temp = vv.toLocaleString();
                    }
                    this.value = temp;
                }

                vv = this.dataType === "Number" ? Number(vv) : String(vv)

                this.$set(this.model, this.field, vv);
            },
            onBlur(v) {
                this.setVal(v.target.value);
            }
        }
    }
</script>
