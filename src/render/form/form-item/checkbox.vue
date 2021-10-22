<template>
    <van-checkbox-group v-model="value" :disabled="!!disabled" class="ftm__checkbox">
        <van-checkbox v-for="(opt, i) in items" :key="i" :name="opt.Value">
            {{ opt.Name }}
        </van-checkbox>
    </van-checkbox-group>
</template>

<script>
export default {
    components: {},
    props: [
        "field", "model", "disabled", "required", "defaultValue", "bindings", "layoutMode", "dataType",
        "optionsType", "optionsDict", "linkage", "isDesign"
    ],
    data() {
        return {
            items: []
        };
    },
    computed: {
        value: {
            get() {
                return this.transGetValue(this.model[this.field])
            },
            set(nv) {
                this.transSubmitValue(nv);
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
        transGetValue(v) {
            if (Array.isArray(v)) {
                return !v ? [] : v;
            } else {
                return !v ? [] : v.split(",");
            }
        },
        transSubmitValue(v) {
            if (this.dataType === "Array") {
                this.$set(this.model, this.field, v);
            } else {
                this.$set(this.model, this.field, v.join(","));
            }
        },
        initBindings() {
            let items = [];
            if (this.optionsType === "static") {
                items = this.bindings;
            }
            if (this.optionsType === "dynamic") {
                items = this.__BindRecords(this.optionsDict) || [];
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
.ftm__checkbox {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;

    > .van-checkbox {
        margin-left: 20px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
}
</style>
