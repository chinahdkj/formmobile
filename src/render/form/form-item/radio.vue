<template>
    <van-radio-group v-model="value" class="ftm__radio" :disabled="!!disabled" @change="onChange">
        <van-radio v-for="(opt, i) in items" :key="i" :name="opt.Value">{{ opt.Name }}</van-radio>
    </van-radio-group>
</template>

<script>
import {BindRecords} from "../../../utils/lib";
import BASE from "./base";
export default {
    mixins:[BASE],
    name: "FtmRadio",
    components: {},
    props: [
        "field", "model", "disabled", "required", "defaultValue", "bindings", "layoutMode", "optionsType",
        "optionsDict", "linkage", "isDesign", "vars",
    ],
    data() {
        return {
            items: [] //选项数据
        };
    },
    computed: {
        value: {
            get() {
                return String(this.model[this.field]);
            },
            set(nv) {
                this.$set(this.model, this.field, nv);
            }
        },
    },
    watch: {
        //设置模式下，需实时查看选项变化
        bindings: {
            deep: true, handler() {
                if (this.isDesign) {
                    this.initBindings();
                }

            }
        },
        optionsDict() {
            if (this.isDesign) {
                this.initBindings();
            }
        },
        optionsType() {
            if (this.isDesign) {
                this.initBindings();
            }
        }
    },
    methods: {
        initBindings() {
            let items = [];
            if (this.optionsType === "static") {
                items = this.bindings;
            }
            if (this.optionsType === "dynamic") {
                items = BindRecords(this.optionsDict) || [];
            }

            //无二级联动
            if (!this.linkage) {
                this.items = items;
                return;
            }
            //存在二级联动()
            this.unwatch = this.$watch(() => {
                if (this.model && (this.linkage in this.model)) {
                    return this.model[this.linkage];
                }
                return null;
            }, (v) => {
                this.value = null;
                this.items = items.filter((b) => {
                    return b.pid === v;
                });
            }, {deep: true, immediate: true});
        },
        onChange(v) {
            this.evalValChange(v);
        }
    },
    mounted() {
        this.initBindings();
    },
    beforeMount() {
        if (this.unwatch) {
            this.unwatch();
        }
    }
}
</script>

<style lang="less" scoped>
.ftm__radio {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;

    > .van-radio {
        margin-left: 20px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
}
</style>
