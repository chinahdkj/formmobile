<template>
    <mue-select v-if="!isMultiple" ref="select" :placeholder="placeholder"
                :data="items" v-model="value" :clearable="!required" :disabled="!!disabled"
                :searchable="!!searchable" @change="onChange"></mue-select>
    <mue-tree-picker v-else ref="select" :placeholder="placeholder" :data="items" v-model="value" :disabled="!!disabled"
                     :clearable="!required" multiple :searchable="!!searchable" :limit="limit" @change="onChange"></mue-tree-picker>
</template>

<script>
    import { TransBindings, BindRecords, GetInterfaceData } from "../../../utils/lib";
    export default {
        name: "FtmSelect",
        components: {},
        props: [
            "field", "model", "vars", "disabled", "required", "defaultValue", "placeholder",
            "multiple", "expandTags", "bindings", "dataType", "optionsType", "optionsDict", "linkage", "searchable",
            "limit", "autoType", "interface", "itfParams", "afterQuery"
        ],
        data() {
            return {
                items: [],
                unwatch: null,
                timer: null
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
            interface: {
                immediate: true, handler(v) {
                    this.initInterfaceData(v)
                }
            },
        },
        methods: {
            transValue(v){
                if(this.isMultiple){
                    if(!v) return [];
                    return Array.isArray(v) ? v : v.split(",");
                }
                return v;
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
                    items = TransBindings(BindRecords(this.optionsDict) || []);
                }

                //无论是否存在二级联动，先进行节点及name赋值
                this.items = items;
                if(this.defaultValue) {
                    this.onChange(this.defaultValue);
                }

                //无二级联动
                if(!this.linkage){
                    return;
                }
                //存在二级联动()
                this.unwatch = this.$watch(() => {
                    let model = {...(this.model || {}), ...(this.vars || {})}
                    if (this.linkage in model) {
                        return model[this.linkage];
                    }
                    return null;
                }, (v) => {
                    this.value = null;
                    this.$set(this.model, `${this.field}$$text`, "");
                    if (this.optionsType === "interface") {
                        this.initInterfaceData(this.interface, v)
                    } else {
                        this.items = items.filter((b) => {
                            return b.pid === v;
                        });
                    }
                }, {deep: true, immediate: !this.defaultValue});
            },
            onChange(v) {
                //存入名称，不再次调用接口
                if(!v) {
                    this.$set(this.model, `${this.field}$$text`, "");
                    return
                }
                this.$nextTick(() => {
                    let name = this.$refs.select.text;
                    this.$set(this.model, `${this.field}$$text`, name);
                })
            },
            async initInterfaceData(url, val) {
                if(!url || this.optionsType !== "interface") {
                    return;
                }

                // clearTimeout(this.timer);
                // this.timer = setTimeout(async () => {
                    //接口数据形式如{Code: 0, Message: "", Response: [{Value: "", Name: ""}]}
                    let items = await GetInterfaceData(url, this.$OPTS.urlPrefix,
                        this.model, this.afterQuery, this.autoType, this.itfParams);
                    this.items = TransBindings(items);
                // }, 500)
            },
        },
        mounted() {
            this.$set(this.model, `${this.field}$$text`, this.model[`${this.field}$$text`] || "");
            this.initBindings();
        },
        beforeMount(){
            if(this.unwatch){
                this.unwatch();
            }
        }
    }
</script>
