<template>
    <mue-select v-if="!isMultiple" :placeholder="placeholder"
                :data="items" v-model="value" :clearable="!required" :disabled="!!disabled"
                :searchable="!!searchable"></mue-select>
    <mue-tree-picker v-else :placeholder="placeholder" :data="items" v-model="value" :disabled="!!disabled"
                     :clearable="!required" multiple :searchable="!!searchable" :limit="limit"></mue-tree-picker>
</template>

<script>
    import { TransBindings } from "../../../utils/lib";
    export default {
        components: {},
        props: [
            "field", "model", "disabled", "required", "defaultValue", "placeholder",
            "multiple", "expandTags", "bindings", "dataType", "optionsType", "optionsDict", "linkage", "searchable",
            "limit"
        ],
        data() {
            return {
                items: []
            };
        },
        computed: {
            isMultiple(){
                return !!this.multiple;
            },
            value: {
                get(){
                    let v = this.model[this.field];
                    return this.transValue(v);
                },
                set(nv){
                    this.commitValue(nv);
                }
            },
        },
        watch: {
        },
        methods: {
            transValue(v){
                if(this.isMultiple){
                    if(!v) return [];
                    return Array.isArray(v) ? v : v.split(",");
                }
                return v? String(v) : null;
            },
            commitValue(v){
                if(!v){
                    this.$set(this.model, this.field, null);
                    return;
                }
                if(this.isMultiple){
                    if(this.dataType === "Array") {
                        this.$set(this.model, this.field, v);
                    } else {
                        this.$set(this.model, this.field, v.join(","));
                    }
                } else{
                    this.$set(this.model, this.field, v);
                }
            },
            initBindings(){
                let items = [];
                if(this.optionsType === "static") {
                    //字典转换 Name,Value => name,code,children
                    items = TransBindings(this.bindings);
                }
                if(this.optionsType === "dynamic") {
                    items = TransBindings(this.__BindRecords(this.optionsDict) || []);
                }

                //无二级联动
                if(!this.linkage){
                    this.items = items;
                    return;
                }
                //存在二级联动()
                this.unwatch = this.$watch(() => {
                    if(this.model && (this.linkage in this.model)){
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
        beforeMount(){
            if(this.unwatch){
                this.unwatch();
            }
        }
    }
</script>
