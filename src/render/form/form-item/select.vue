<template>
    <mue-select v-if="!isMultiple" ref="select" :placeholder="placeholder"
                :data="items" v-model="value" :clearable="!required" :disabled="!!disabled"
                :searchable="!!searchable" @change="onChange"></mue-select>
    <mue-tree-picker v-else ref="select" :placeholder="placeholder" :data="items" v-model="value" :disabled="!!disabled"
                     :clearable="!required" multiple :searchable="!!searchable" :limit="limit" @change="onChange"></mue-tree-picker>
</template>

<script>
    import { TransBindings, BindRecords, TransferUrl } from "../../../utils/lib";
    export default {
        name: "FtmSelect",
        components: {},
        props: [
            "field", "model", "disabled", "required", "defaultValue", "placeholder",
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
                    if(this.model && (this.linkage in this.model)){
                        return this.model[this.linkage];
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
            initInterfaceData(url, val) {
                if(!url || this.optionsType !== "interface") {
                    return;
                }

                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    let res_Url = TransferUrl(url, this.model);
                    let success = (res) => {
                        //接口返回数据结构处理，默认是{Code: 0, Message: "", Response: [{Value: "", Name: ""}]}形式
                        console.log(res);
                        if (this.afterQuery) {
                            try {
                                this.items = TransBindings(eval(`(function(res) {
                                    ${this.afterQuery || 'return res;'}
                                })(res)`))
                            } catch (e) {
                                this.items = []
                                console.error(e)
                            }
                        } else {
                            if (res.Code === 0) {
                                this.items = TransBindings(res.Response || []);
                            } else {
                                this.items = [];
                                console.error(res.Message);
                            }
                        }
                    }

                    let fail = (e) => {
                        console.log(e);
                        this.items = [];
                    }

                    if(this.autoType === 1) {
                        let customParams = JSON.parse(TransferUrl(JSON.stringify(this.itfParams), this.model)); //自定义参数
                        let params = {...customParams, ...{url: res_Url}}
                        this.$server._Post(params, this.$OPTS.urlPrefix || "").then(success).catch(fail);
                    } else {
                        this.$server._Get({url: res_Url}, this.$OPTS.urlPrefix || "").then(success).catch(fail);
                    }
                }, 500)
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
